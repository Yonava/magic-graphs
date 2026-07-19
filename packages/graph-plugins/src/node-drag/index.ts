import { nullThrows } from '@core/utils/assert';
import { MOUSE_BUTTONS } from '@core/utils/mouse';
import { NodePositionStreamControls } from '@graph/core/positions/types';
import { createDragState } from '@graph/plugins-shared/drag';
import { createEventHub } from '@graph/primitives/events/createEventHub';
import { DeepReadonly } from 'ts-essentials';

import { ANCHOR_PLUGIN_ID } from '../anchors/constants.ts';
import { CanvasGraphMouseEvent } from '../canvas/events.ts';
import { GraphUnderCursor } from '../canvas/types.ts';
import {
  NODE_DRAG_CANVAS_ELEMENT_DATA_FIELD,
  NODE_DRAG_PLUGIN_ID,
} from './constants.ts';
import { createDragThemer } from './createDragThemer.ts';
import { createNodeDragEventRegistry } from './events.ts';
import { NodeDragPlugin, NodeIdDragState } from './types.ts';
import { validateNodeIds } from './validateNodeIds.ts';

export const nodeDrag: NodeDragPlugin = ({ controls, actions, getters }) => {
  const nodeDragEventRegistry = createNodeDragEventRegistry();
  const nodeDragEventHub = createEventHub(nodeDragEventRegistry);

  const dragState = createDragState<NodeIdDragState>();
  let nodePositionStream: NodePositionStreamControls | undefined;

  const beginDrag = (
    { elements, coords, event }: CanvasGraphMouseEvent,
    consume: () => void,
  ) => {
    if (event.button !== MOUSE_BUTTONS.left) return;

    const topElement = elements.at(-1);
    if (!topElement) return;

    const nodeIdsToDrag = [];

    if (controls.isNode(topElement.id)) {
      nodeIdsToDrag.push(topElement.id);
    }

    const nodeIds = topElement.data?.[NODE_DRAG_CANVAS_ELEMENT_DATA_FIELD];
    if (nodeIds !== undefined) {
      if (!validateNodeIds(nodeIds)) {
        console.warn('node drag expected array of node ids: got', nodeIds);
      } else {
        nodeIdsToDrag.push(...nodeIds);
      }
    }

    if (nodeIdsToDrag.length === 0) return;

    consume();

    const nodes = nodeIdsToDrag.map((nodeId) =>
      nullThrows(
        getters.getNode(nodeId),
        'canvas element of graph type node not resolvable as node',
      ),
    );

    if (nodePositionStream) {
      throw new Error(
        'beginDrag called while a node position stream is already active',
      );
    }
    dragState.startDrag(coords, { nodeIds: nodeIdsToDrag });
    nodePositionStream = controls.positions.createStream();
    nodeDragEventHub.emit('onNodeDragStart', nodes);
  };

  const drop = () => {
    const data = dragState.stopDrag();
    if (!data) return;
    const stream = nullThrows(
      nodePositionStream,
      'node position stream controls undefined',
    );
    stream.stop();
    nodePositionStream = undefined;
    nodeDragEventHub.emit(
      'onNodeDrop',
      data.nodeIds.map((nodeId) =>
        nullThrows(getters.getNode(nodeId), 'dropped node not found'),
      ),
    );
  };

  const drag = (
    { coords }: DeepReadonly<GraphUnderCursor>,
    consume: () => void,
  ) => {
    const dragData = dragState.applyMove(coords);
    if (!dragData) return;

    const {
      data: { nodeIds },
      deltas: { dx, dy },
    } = dragData;

    consume();

    if (!dx && !dy) return;

    const nodes = nodeIds.map((nodeId) =>
      nullThrows(getters.getNode(nodeId), 'dragged node not found'),
    );

    const stream = nullThrows(
      nodePositionStream,
      'node position stream controls undefined',
    );

    stream.setMany(
      nodes.map((n) => ({
        nodeId: n.id,
        update: (pos) => ({ x: pos.x + dx, y: pos.y + dy }),
      })),
    );
  };

  const cursorTheme = createDragThemer(controls, dragState);

  const enable = () => {
    controls.canvas.events.handle('onMouseDown', beginDrag, NODE_DRAG_PLUGIN_ID, {
      before: [ANCHOR_PLUGIN_ID],
    });
    controls.canvas.events.handle('onMouseUp', drop, NODE_DRAG_PLUGIN_ID, {
      before: [ANCHOR_PLUGIN_ID],
    });
    controls.canvas.events.handle('onGraphUnderCursorChange', drag, NODE_DRAG_PLUGIN_ID, {
      before: [ANCHOR_PLUGIN_ID],
    });
    cursorTheme.enable();
  };

  const disable = () => {
    controls.canvas.events.unhandle('onMouseDown', beginDrag);
    controls.canvas.events.unhandle('onMouseUp', drop);
    controls.canvas.events.unhandle('onGraphUnderCursorChange', drag);
    cursorTheme.disable();
    drop();
  };

  enable();

  return {
    name: 'nodeDrag',
    getters,
    actions,
    controls: {
      events: nodeDragEventHub,
      lifecycle: {
        enable,
        disable,
      },
    },
  };
};
