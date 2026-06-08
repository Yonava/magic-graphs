import { MOUSE_BUTTONS } from '@magic/utils/mouse';
import { DeepReadonly } from 'ts-essentials';

import { computed, ref } from 'vue';

import { BaseEventMap } from '../../base/events.ts';
import type { BaseGraph } from '../../base/types.ts';
import { EventHub, createEventHub } from '../../events/createEventHub.ts';
import { mergeEventHubs } from '../../events/mergeEventHubs.ts';
import { ANCHOR_EVENT_ID } from '../anchors/index.ts';
import { CanvasEventMap, CanvasGraphMouseEvent } from '../canvas/events.ts';
import { CanvasPlugin, GraphAtMousePosition } from '../canvas/types.ts';
import { NodeDragEventMap, createNodeDragEventRegistry } from './events.ts';
import { ActiveDragNode, GraphWithNodeDrag } from './types.ts';

export const DRAG_EVENT_ID = 'drag';

export const useNodeDragPlugin = <
  TransactionWrapperOptions,
  EventMap extends BaseEventMap & CanvasEventMap,
  Plugins extends CanvasPlugin,
>(
  graph: BaseGraph<TransactionWrapperOptions, EventMap, Plugins>,
): GraphWithNodeDrag<TransactionWrapperOptions, EventMap, Plugins> => {
  const activeDrag = ref<ActiveDragNode | undefined>();

  const nodeDragRegistry = createNodeDragEventRegistry();
  const nodeDragHub: EventHub<NodeDragEventMap> =
    createEventHub(nodeDragRegistry);
  const events = mergeEventHubs(
    nodeDragHub,
    // casting because graph.events could be arbitrarily broad due to it being stuffed with other events
    // from plugins upstream
    graph.events as EventHub<BaseEventMap & CanvasEventMap>,
  );

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

    activeDrag.value = { nodeId: node.id, coords };
    events.emit('onNodeDragStart', node);
  };

  const drop = () => {
    if (!activeDrag.value) return;

    const { nodeId } = activeDrag.value;
    const droppedNode = graph.getNode(nodeId);
    if (!droppedNode) throw new Error('dropped node not found');

    activeDrag.value = undefined;

    events.emit('onNodeDrop', droppedNode);

    const { items } = graph.canvas.graphAtMousePosition;
    const topItem = items.at(-1);
    if (topItem?.id !== droppedNode.id) return;
  };

  const drag = (
    { coords: magicCoords }: DeepReadonly<GraphAtMousePosition>,
    consume: () => void,
  ) => {
    if (!activeDrag.value) return;
    consume();
    const { nodeId, coords } = activeDrag.value;
    const node = graph.getNode(nodeId);
    if (!node) throw new Error('dragged node not found');

    const dx = magicCoords.x - coords.x;
    const dy = magicCoords.y - coords.y;

    const x = node.x + dx;
    const y = node.y + dy;
    if (!dx && !dy) return;
    const newCoords = { x, y };

    graph.actions.updateNode({
      id: nodeId,
      values: newCoords,
    });

    activeDrag.value.coords = newCoords;
  };

  const activate = () => {
    events.handle('onMouseDown', beginDrag, DRAG_EVENT_ID, {
      before: [ANCHOR_EVENT_ID],
    });
    events.handle('onMouseUp', drop, DRAG_EVENT_ID, {
      before: [ANCHOR_EVENT_ID],
    });
    events.handle('onGraphCursorUpdate', drag, DRAG_EVENT_ID, {
      before: [ANCHOR_EVENT_ID],
    });
    graph.canvas.cursor.graphToCursorMap.value['node'] = 'grab';
  };

  const deactivate = () => {
    events.unhandle('onMouseDown', beginDrag);
    events.unhandle('onMouseUp', drop);
    events.unhandle('onGraphCursorUpdate', drag);
    graph.canvas.cursor.graphToCursorMap.value['node'] = 'pointer';
    if (activeDrag.value) drop();
  };

  events.subscribe('onSettingsChange', (diff) => {
    if (diff.draggable === false) deactivate();
    else if (diff.draggable === true) activate();
  });

  if (graph.settings.value.draggable) activate();
  if (!graph.settings.value.draggable) deactivate();

  return {
    ...graph,
    events,
    nodeDrag: {
      currentlyDraggingNode: computed(() => {
        return activeDrag.value
          ? graph.getNode(activeDrag.value.nodeId)
          : undefined;
      }),
    },
  };
};
