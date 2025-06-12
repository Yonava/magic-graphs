import { ref, computed } from 'vue';
import type { GraphMouseEvent } from '@graph/base/types';
import type { ActiveDragNode } from './types';
import type { BaseGraph } from '@graph/base';
import type { NodeAnchorPlugin } from '../anchors';
import { MOUSE_BUTTONS } from "@graph/global";

export const useNodeDrag = (graph: BaseGraph & NodeAnchorPlugin) => {
  const currentlyDraggingNode = ref<ActiveDragNode | undefined>();
  const { hold, release } = graph.pluginHoldController('node-drag');

  const beginDrag = ({ items, coords, event }: GraphMouseEvent) => {
    if (event.button !== MOUSE_BUTTONS.left) return;
    const topItem = items.at(-1);
    if (!topItem || topItem.graphType !== 'node') return;

    hold('nodeAnchors');

    const node = graph.getNode(topItem.id);
    if (!node) return;

    currentlyDraggingNode.value = { node, coords };
    graph.emit('onNodeDragStart', node);
  };

  const drop = () => {
    if (!currentlyDraggingNode.value) return;

    const { node: droppedNode } = currentlyDraggingNode.value
    currentlyDraggingNode.value = undefined;

    graph.emit('onNodeDrop', droppedNode);
    release('nodeAnchors');

    const { items } = graph.graphAtMousePosition.value
    const topItem = items.at(-1);
    if (topItem?.id !== droppedNode.id) return

    graph.nodeAnchors.setParentNode(droppedNode.id);
  };

  const drag = ({ coords: evCoords }: GraphMouseEvent) => {
    if (!currentlyDraggingNode.value) return;

    const { node, coords } = currentlyDraggingNode.value;

    const dx = evCoords.x - coords.x;
    const dy = evCoords.y - coords.y;

    graph.moveNode(node.id, {
      x: node.x + dx,
      y: node.y + dy,
    });

    currentlyDraggingNode.value.coords = evCoords;
  };

  const activate = () => {
    graph.subscribe('onMouseDown', beginDrag);
    graph.subscribe('onMouseUp', drop);
    graph.subscribe('onMouseMove', drag);
    graph.graphToCursorMap.value['node'] = 'grab';
  };

  const deactivate = () => {
    graph.unsubscribe('onMouseDown', beginDrag);
    graph.unsubscribe('onMouseUp', drop);
    graph.unsubscribe('onMouseMove', drag);
    graph.graphToCursorMap.value['node'] = 'pointer';
    if (currentlyDraggingNode.value) drop();
  };

  graph.subscribe('onSettingsChange', (diff) => {
    if (diff.draggable === false) deactivate();
    else if (diff.draggable === true) activate();
  });

  if (graph.settings.value.draggable) activate();
  if (!graph.settings.value.draggable) deactivate();

  return {
    /**
     * the node that is currently being dragged or undefined if no node is being dragged
     */
    currentlyDraggingNode: computed(() => currentlyDraggingNode.value?.node),
  };
};

export type GraphNodeDragControls = ReturnType<typeof useNodeDrag>;
