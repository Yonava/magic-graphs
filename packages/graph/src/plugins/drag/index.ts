import { nullThrows } from '@magic/utils/assert';
import { MOUSE_BUTTONS } from '@magic/utils/mouse';
import { DeepReadonly } from 'ts-essentials';

import { CoreEventMap } from '../../core/events.ts';
import { NodePositionStreamControls } from '../../core/positions/types.ts';
import type { CoreGraph } from '../../core/types.ts';
import { EventHub, createEventHub } from '../../events/createEventHub.ts';
import { mergeEventHubs } from '../../events/mergeEventHubs.ts';
import { createDragState } from '../../shared/drag/createDragState.ts';
import { ANCHOR_EVENT_ID } from '../anchors/index.ts';
import { CanvasEventMap, CanvasGraphMouseEvent } from '../canvas/events.ts';
import { CanvasPlugin, GraphUnderCursor } from '../canvas/types.ts';
import { createDragThemer } from './createDragThemer.ts';
import { NodeDragEventMap, createNodeDragEventRegistry } from './events.ts';
import { GraphWithNodeDrag, NodeIdDragState } from './types.ts';

export const DRAG_EVENT_ID = 'drag';
export const DRAG_CANVAS_ELEMENT_DATA_FIELD = 'dragNodeIds';

const validateNodeIds = (nodeIdsOrJunk: unknown): nodeIdsOrJunk is string[] => {
  if (!Array.isArray(nodeIdsOrJunk)) return false;
  return nodeIdsOrJunk.every(
    (nodeIdOrJunk) => typeof nodeIdOrJunk === 'string',
  );
};

export const useNodeDragPlugin = <
  TransactionWrapperOptions,
  EventMap extends CoreEventMap & CanvasEventMap,
  Plugins extends CanvasPlugin,
>(
  graph: CoreGraph<TransactionWrapperOptions, EventMap, Plugins>,
): GraphWithNodeDrag<TransactionWrapperOptions, EventMap, Plugins> => {
  const nodeDragRegistry = createNodeDragEventRegistry();
  const nodeDragHub: EventHub<NodeDragEventMap> =
    createEventHub(nodeDragRegistry);
  const events = mergeEventHubs(
    nodeDragHub,
    // casting because graph.events could be arbitrarily broad due to it being stuffed with other events
    // from plugins upstream
    graph.events as EventHub<CoreEventMap & CanvasEventMap>,
  );

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

    const nodeIds = topElement.data?.[DRAG_CANVAS_ELEMENT_DATA_FIELD];
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
        graph.getNode(nodeId),
        'canvas element of graph type node not resolvable as node',
      ),
    );

    if (nodePositionStream) {
      throw new Error(
        'beginDrag called while a node position stream is already active',
      );
    }
    dragState.startDrag(coords, { nodeIds: nodeIdsToDrag });
    nodePositionStream = graph.positions.createStream();
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
        nullThrows(graph.getNode(nodeId), 'dropped node not found'),
      ),
    );
  };

  const drag = (
    { coords: magicCoords }: DeepReadonly<GraphUnderCursor>,
    consume: () => void,
  ) => {
    const dragData = dragState.applyMove(magicCoords);
    if (!dragData) return;

    const {
      data: { nodeIds },
      deltas: { dx, dy },
    } = dragData;

    consume();

    if (!dx && !dy) return;

    const nodes = nodeIds.map((nodeId) =>
      nullThrows(graph.getNode(nodeId), 'dragged node not found'),
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

  const cursorTheme = createDragThemer(
    graph.canvas.theme.createLayer,
    dragState,
  );

  const activate = () => {
    events.handle('onMouseDown', beginDrag, DRAG_EVENT_ID, {
      before: [ANCHOR_EVENT_ID],
    });
    events.handle('onMouseUp', drop, DRAG_EVENT_ID, {
      before: [ANCHOR_EVENT_ID],
    });
    events.handle('onGraphUnderCursorChange', drag, DRAG_EVENT_ID, {
      before: [ANCHOR_EVENT_ID],
    });
    cursorTheme.activate();
  };

  const deactivate = () => {
    events.unhandle('onMouseDown', beginDrag);
    events.unhandle('onMouseUp', drop);
    events.unhandle('onGraphUnderCursorChange', drag);
    cursorTheme.deactivate();
    drop();
  };

  activate();

  return {
    ...graph,
    events,
    nodeDrag: {
      activate,
      deactivate,
    },
  };
};
