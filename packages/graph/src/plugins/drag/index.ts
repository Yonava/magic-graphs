import type { Coordinate } from '@magic/shapes/types/utility';
import { MOUSE_BUTTONS } from '@magic/utils/mouse';

import { computed, ref } from 'vue';

import { BaseEventMap } from '../../base/events.ts';
import type { BaseGraph } from '../../base/types.ts';
import { EventHub, createEventHub } from '../../events/createEventHub.ts';
import { mergeEventHubs } from '../../events/mergeEventHubs.ts';
import type { GNode } from '../../types.ts';
import { CanvasEventMap, CanvasGraphMouseEvent } from '../canvas/events.ts';
import { CanvasPlugin } from '../canvas/types.ts';
import { NodeDragEventMap, createNodeDragEventBus } from './events.ts';
import { GraphWithNodeDrag } from './types.ts';

/**
 * info for the node being dragged
 */
export type ActiveDragNode = {
  nodeId: GNode['id'];
  coords: Coordinate;
};

export const useNodeDragPlugin = <
  TransactionWrapperOptions,
  EventMap extends BaseEventMap & CanvasEventMap,
  Plugins extends CanvasPlugin,
>(
  graph: BaseGraph<TransactionWrapperOptions, EventMap, Plugins>,
): GraphWithNodeDrag<TransactionWrapperOptions, EventMap, Plugins> => {
  const activeDrag = ref<ActiveDragNode | undefined>();
  const { hold, release } = graph.pluginHoldController('node-drag');

  const nodeDragBus = createNodeDragEventBus();
  const nodeDragHub: EventHub<NodeDragEventMap> = createEventHub(nodeDragBus);
  const events = mergeEventHubs(
    nodeDragHub,
    // casting because graph.events could be arbitrarily broad due to it being stuffed with other events
    // from plugins upstream
    graph.events as EventHub<BaseEventMap & CanvasEventMap>,
  );

  const beginDrag = ({ items, coords, event }: CanvasGraphMouseEvent) => {
    if (event.button !== MOUSE_BUTTONS.left) return;
    const topItem = items.at(-1);
    if (!topItem || topItem.graphType !== 'node') return;

    hold('nodeAnchors');

    const node = graph.getNode(topItem.id);
    if (!node) return;

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
    release('nodeAnchors');

    const { items } = graph.graphAtMousePosition.value;
    const topItem = items.at(-1);
    if (topItem?.id !== droppedNode.id) return;
  };

  const drag = ({ coords: magicCoords }: CanvasGraphMouseEvent) => {
    if (!activeDrag.value) return;

    const { nodeId, coords } = activeDrag.value;
    const node = graph.getNode(nodeId);
    if (!node) throw new Error('dragged node not found');

    const dx = magicCoords.x - coords.x;
    const dy = magicCoords.y - coords.y;

    graph.actions.updateNode({
      id: nodeId,
      values: {
        x: node.x + dx,
        y: node.y + dy,
      },
    });

    activeDrag.value.coords = magicCoords;
  };

  const activate = () => {
    events.subscribe('onMouseDown', beginDrag);
    events.subscribe('onMouseUp', drop);
    events.subscribe('onMouseMove', drag);
    graph.cursor.graphToCursorMap.value['node'] = 'grab';
  };

  const deactivate = () => {
    events.unsubscribe('onMouseDown', beginDrag);
    events.unsubscribe('onMouseUp', drop);
    events.unsubscribe('onMouseMove', drag);
    graph.cursor.graphToCursorMap.value['node'] = 'pointer';
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
