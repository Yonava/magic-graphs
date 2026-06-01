import type { Coordinate } from '@magic/shapes/types/utility';
import { MOUSE_BUTTONS } from '@magic/utils/mouse';

import { computed, ref } from 'vue';

import type { GraphMouseEvent } from '../../base/types.ts';
import type { GNode } from '../../types.ts';
import { GraphWithPlugins } from '../../useGraph.ts';

/**
 * info for the node being dragged
 */
export type ActiveDragNode = {
  nodeId: GNode['id'];
  coords: Coordinate;
};

export const useNodeDrag = (graph: GraphWithPlugins) => {
  const activeDrag = ref<ActiveDragNode | undefined>();
  const { hold, release } = graph.pluginHoldController('node-drag');

  const beginDrag = ({ items, coords, event }: GraphMouseEvent) => {
    if (event.button !== MOUSE_BUTTONS.left) return;
    const topItem = items.at(-1);
    if (!topItem || topItem.graphType !== 'node') return;

    hold('nodeAnchors');

    const node = graph.getNode(topItem.id);
    if (!node) return;

    activeDrag.value = { nodeId: node.id, coords };
    // @ts-expect-error migration
    graph.events.emit('onNodeDragStart', node);
  };

  const drop = () => {
    if (!activeDrag.value) return;

    const { nodeId } = activeDrag.value;
    const droppedNode = graph.getNode(nodeId);
    if (!droppedNode) throw new Error('dropped node not found');

    activeDrag.value = undefined;

    // @ts-expect-error migration
    graph.events.emit('onNodeDrop', droppedNode);
    release('nodeAnchors');

    const { items } = graph.graphAtMousePosition.value;
    const topItem = items.at(-1);
    if (topItem?.id !== droppedNode.id) return;
  };

  const drag = ({ coords: magicCoords }: GraphMouseEvent) => {
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
    graph.events.subscribe('onMouseDown', beginDrag);
    graph.events.subscribe('onMouseUp', drop);
    graph.events.subscribe('onMouseMove', drag);
    graph.cursor.graphToCursorMap.value['node'] = 'grab';
  };

  const deactivate = () => {
    graph.events.unsubscribe('onMouseDown', beginDrag);
    graph.events.unsubscribe('onMouseUp', drop);
    graph.events.unsubscribe('onMouseMove', drag);
    graph.cursor.graphToCursorMap.value['node'] = 'pointer';
    if (activeDrag.value) drop();
  };

  graph.events.subscribe('onSettingsChange', (diff) => {
    if (diff.draggable === false) deactivate();
    else if (diff.draggable === true) activate();
  });

  if (graph.settings.value.draggable) activate();
  if (!graph.settings.value.draggable) deactivate();

  return {
    /**
     * the node that is currently being dragged or undefined if no node is being dragged
     */
    currentlyDraggingNode: computed(() => {
      return activeDrag.value
        ? graph.getNode(activeDrag.value.nodeId)
        : undefined;
    }),
  };
};

export type GraphNodeDragControls = ReturnType<typeof useNodeDrag>;
