import { CoreEventMap } from '@magic/graph/core/events';
import { NodePositionStreamControls } from '@magic/graph/core/positions/types';
import { createEventHub } from '@magic/graph/events/createEventHub';
import { mergeEventHubs } from '@magic/graph/events/mergeEventHubs';
import { nullThrows } from '@magic/utils/assert';
import { MOUSE_BUTTONS } from '@magic/utils/mouse';
import { DeepReadonly } from 'ts-essentials';

import { createDragState } from '../../../graph-plugins-shared/src/drag/createDragState.ts';
import { ANCHOR_PLUGIN_ID } from '../anchors/constants.ts';
import { CanvasEventMap, CanvasGraphMouseEvent } from '../canvas/events.ts';
import { GraphUnderCursor } from '../canvas/types.ts';
import { FocusEventMap } from '../focus/events.ts';
import { MarqueeEventMap } from '../marquee/events.ts';
import {
  NODE_DRAG_CANVAS_ELEMENT_DATA_FIELD,
  NODE_DRAG_PLUGIN_ID,
} from './constants.ts';
import { createDragThemer } from './createDragThemer.ts';
import { NodeDragEventMap, createNodeDragEventRegistry } from './events.ts';
import { NodeDragPlugin, NodeIdDragState } from './types.ts';
import { validateNodeIds } from './validateNodeIds.ts';

export const nodeDrag: NodeDragPlugin = (
  controls,
  graphEventMap,
  actions,
  getters,
) => {
  const nodeDragEventRegistry = createNodeDragEventRegistry();
  const nodeDragEventHub = createEventHub(nodeDragEventRegistry);
  const events = mergeEventHubs<
    NodeDragEventMap,
    CoreEventMap & CanvasEventMap & MarqueeEventMap & FocusEventMap
  >(nodeDragEventHub, graphEventMap);

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

    if (topElement.graphType === 'node') {
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
    events.emit('onNodeDragStart', nodes);
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
    events.emit(
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
    events.handle('onMouseDown', beginDrag, NODE_DRAG_PLUGIN_ID, {
      before: [ANCHOR_PLUGIN_ID],
    });
    events.handle('onMouseUp', drop, NODE_DRAG_PLUGIN_ID, {
      before: [ANCHOR_PLUGIN_ID],
    });
    events.handle('onGraphUnderCursorChange', drag, NODE_DRAG_PLUGIN_ID, {
      before: [ANCHOR_PLUGIN_ID],
    });
    cursorTheme.enable();
  };

  const disable = () => {
    events.unhandle('onMouseDown', beginDrag);
    events.unhandle('onMouseUp', drop);
    events.unhandle('onGraphUnderCursorChange', drag);
    cursorTheme.disable();
    drop();
  };

  enable();

  return {
    events,
    getters,
    actions,
    controls: {
      nodeDrag: {
        lifecycle: {
          enable,
          disable,
        },
      },
    },
  };
};
