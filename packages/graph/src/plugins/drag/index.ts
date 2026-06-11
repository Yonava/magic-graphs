import { nullThrows } from '@magic/utils/assert';
import { MOUSE_BUTTONS } from '@magic/utils/mouse';
import { DeepReadonly } from 'ts-essentials';

import { CoreEventMap } from '../../core/events.ts';
import type { CoreGraph } from '../../core/types.ts';
import { EventHub, createEventHub } from '../../events/createEventHub.ts';
import { mergeEventHubs } from '../../events/mergeEventHubs.ts';
import { createDragState } from '../../shared/createDragState.ts';
import { ANCHOR_EVENT_ID } from '../anchors/index.ts';
import { CanvasEventMap, CanvasGraphMouseEvent } from '../canvas/events.ts';
import { CanvasPlugin, GraphUnderCursor } from '../canvas/types.ts';
import { NodeDragEventMap, createNodeDragEventRegistry } from './events.ts';
import { GraphWithNodeDrag } from './types.ts';

export const DRAG_EVENT_ID = 'drag';

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

  const dragState = createDragState<{ nodeIds: string[] }>();

  const beginDrag = (
    { elements: items, coords, event }: CanvasGraphMouseEvent,
    consume: () => void,
  ) => {
    if (event.button !== MOUSE_BUTTONS.left) return;

    const topItem = items.at(-1);
    if (!topItem) return;

    const nodeIdsToDrag = [];

    if (topItem.graphType === 'node') {
      nodeIdsToDrag.push(topItem.id);
    }

    if (topItem.graphType === 'encapsulated-node-box') {
      const nodeIdsInBox = nullThrows(
        topItem.data?.nodeIds as string[],
        'encapsulated node box must provide node ids in canvas element metadata',
      );
      nodeIdsToDrag.push(...nodeIdsInBox);
    }

    if (nodeIdsToDrag.length === 0) return;

    consume();

    const nodes = nodeIdsToDrag.map((nodeId) =>
      nullThrows(
        graph.getNode(nodeId),
        'canvas element of graph type node not resolvable as node',
      ),
    );

    dragState.startDrag(coords, { nodeIds: nodeIdsToDrag });
    events.emit('onNodeDragStart', nodes);
  };

  const drop = () => {
    const data = dragState.stopDrag();
    if (!data) return;
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

    graph.actions.updateElements({
      nodes: nodes.map(({ id, x, y }) => ({
        id,
        values: {
          x: x + dx,
          y: y + dy,
        },
      })),
    });
  };

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
    // graph.canvas.cursor.graphToCursorMap.value['node'] = 'grab';
  };

  const deactivate = () => {
    events.unhandle('onMouseDown', beginDrag);
    events.unhandle('onMouseUp', drop);
    events.unhandle('onGraphUnderCursorChange', drag);
    // graph.canvas.cursor.graphToCursorMap.value['node'] = 'pointer';
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
