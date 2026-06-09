import { MOUSE_BUTTONS } from '@magic/utils/mouse';
import { DeepReadonly } from 'ts-essentials';

import { computed, ref } from 'vue';

import { BaseEventMap } from '../../base/events.ts';
import type { BaseGraph } from '../../base/types.ts';
import { EventHub, createEventHub } from '../../events/createEventHub.ts';
import { mergeEventHubs } from '../../events/mergeEventHubs.ts';
import { ANCHOR_EVENT_ID } from '../anchors/index.ts';
import { CanvasEventMap, CanvasGraphMouseEvent } from '../canvas/events.ts';
import { CanvasPlugin, GraphUnderCursor } from '../canvas/types.ts';
import { NodeDragEventMap, createNodeDragEventRegistry } from './events.ts';
import { GraphWithNodeDrag } from './types.ts';
import { useDragState } from './useDragState.ts';

export const DRAG_EVENT_ID = 'drag';

export const useNodeDragPlugin = <
  TransactionWrapperOptions,
  EventMap extends BaseEventMap & CanvasEventMap,
  Plugins extends CanvasPlugin,
>(
  graph: BaseGraph<TransactionWrapperOptions, EventMap, Plugins>,
): GraphWithNodeDrag<TransactionWrapperOptions, EventMap, Plugins> => {
  const nodeDragRegistry = createNodeDragEventRegistry();
  const nodeDragHub: EventHub<NodeDragEventMap> =
    createEventHub(nodeDragRegistry);
  const events = mergeEventHubs(
    nodeDragHub,
    // casting because graph.events could be arbitrarily broad due to it being stuffed with other events
    // from plugins upstream
    graph.events as EventHub<BaseEventMap & CanvasEventMap>,
  );

  const dragState = useDragState((data: { nodeId: string }) => {
    const node = graph.getNode(data.nodeId);
    if (!node) throw new Error('node not found');
    return node;
  });

  const beginDrag = (
    { items, coords, event }: CanvasGraphMouseEvent,
    consume: () => void,
  ) => {
    if (event.button !== MOUSE_BUTTONS.left) return;
    const topItem = items.at(-1);
    if (!topItem || topItem.graphType !== 'node') return;

    const node = graph.getNode(topItem.id);
    if (!node) return;

    consume();

    dragState.startDrag(coords, { nodeId: node.id });
    events.emit('onNodeDragStart', node);
  };

  const drop = () => {
    const data = dragState.stopDrag();
    if (!data) return;

    const droppedNode = graph.getNode(data.nodeId);
    if (!droppedNode) throw new Error('dropped node not found');

    events.emit('onNodeDrop', droppedNode);
  };

  const drag = (
    { coords: magicCoords }: DeepReadonly<GraphUnderCursor>,
    consume: () => void,
  ) => {
    const newCoords = dragState.applyMove(magicCoords);
    if (!newCoords) return;

    consume();

    graph.actions.updateNode({
      id: newCoords.data.nodeId,
      values: newCoords,
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
    graph.canvas.cursor.graphToCursorMap.value['node'] = 'grab';
  };

  const deactivate = () => {
    events.unhandle('onMouseDown', beginDrag);
    events.unhandle('onMouseUp', drop);
    events.unhandle('onGraphUnderCursorChange', drag);
    graph.canvas.cursor.graphToCursorMap.value['node'] = 'pointer';
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
