import type { BaseGraph } from '@graph/base';
import type { GraphMouseEvent } from '@graph/base/types';
import { prioritizeNode } from '@graph/helpers';
import type { NodeAnchor } from '@graph/plugins/anchors/types';
import type { GraphFocusPlugin } from '@graph/plugins/focus';
import type { GNode, SchemaItem } from '@graph/types';
import type { CircleSchema } from '@shape/shapes/circle/types';
import type { WithId } from '@shape/types';
import { MOUSE_BUTTONS } from '@utils/mouse';

import { readonly, ref } from 'vue';

/**
 * node anchors provide an additional layer of interaction by allowing nodes to spawn draggable anchors
 * when hovered over.
 *
 * helpful definitions:
 * - Anchor/Node Anchor: A draggable handle that spawns around the parent node.
 * - Parent Node: The node which anchors actively orbit around.
 * - Link Preview: The line that appears between the parent node and the anchor when the anchor is being dragged.
 */
export const useNodeAnchors = (graph: BaseGraph & GraphFocusPlugin) => {
  /**
   * The node which anchors actively orbit around
   */
  const parentNode = ref<GNode>();
  /**
   * The anchor that is currently being dragged.
   */
  const currentDraggingAnchor = ref<NodeAnchor>();

  const clearAnchorState = () => {
    parentNode.value = undefined;
    currentDraggingAnchor.value = undefined;
  };

  const setParentNode = (nodeId: GNode['id']) => {
    if (graph.settings.value.nodeAnchors === false) return;

    const node = graph.getNode(nodeId);

    if (!node) throw new Error('node not found');

    parentNode.value = node;
    updateNodeAnchors(node);
  };

  const hoveredNodeAnchorId = ref<NodeAnchor['id']>();

  const updateHoveredNodeAnchorId = ({ items }: GraphMouseEvent) => {
    const topItem = items.at(-1);
    if (!topItem) return (hoveredNodeAnchorId.value = undefined);

    hoveredNodeAnchorId.value = topItem.id;
  };

  const getAnchorSchemas = (node: GNode) => {
    const { getTheme } = graph;

    const color = getTheme('nodeAnchorColor', node);
    const focusColor = getTheme('nodeAnchorColorWhenParentFocused', node);
    const radius = getTheme('nodeAnchorRadius', node);

    const anchorSchemas: SchemaItem[] = [];
    for (const anchor of nodeAnchors.value) {
      const { x, y, id } = anchor;

      const isHoveredOrDragged =
        id === hoveredNodeAnchorId.value ||
        id === currentDraggingAnchor.value?.id;

      const nodeAnchorSchema: WithId<CircleSchema> = {
        id,
        at: { x, y },
        radius,
        fillColor: isHoveredOrDragged ? focusColor : color,
      };

      if (
        currentDraggingAnchor.value &&
        currentDraggingAnchor.value.direction === anchor.direction
      ) {
        nodeAnchorSchema.at.x = currentDraggingAnchor.value.x;
        nodeAnchorSchema.at.y = currentDraggingAnchor.value.y;
      }

      const nodeAnchorShape = graph.shapes.circle(nodeAnchorSchema);

      const beingDragged = anchor.id === currentDraggingAnchor.value?.id;
      anchorSchemas.push({
        id: anchor.id,
        graphType: 'node-anchor',
        shape: nodeAnchorShape,
        priority: beingDragged ? Infinity : 99_999,
      });
    }

    return anchorSchemas;
  };

  /**
   * Draggable handles that spawns around the parent node.
   */
  const nodeAnchors = ref<NodeAnchor[]>([]);

  /**
   * updates the node anchor ref with the new node anchors
   *
   * @param {GNode} node - the parent node of the anchor
   * @returns {void}
   */
  const updateNodeAnchors = (node: GNode | undefined) => {
    if (!node) return (nodeAnchors.value = []);
    const { getTheme } = graph;

    const anchorRadius = getTheme('nodeAnchorRadius', node);
    const nodeSize = getTheme('nodeSize', node);
    const nodeBorderWidth = getTheme('nodeBorderWidth', node);

    const offset = nodeSize - anchorRadius / 3 + nodeBorderWidth / 2;
    nodeAnchors.value = [
      {
        id: 'n-anchor',
        x: node.x,
        y: node.y - offset,
        direction: 'north',
      },
      {
        id: 'e-anchor',
        x: node.x + offset,
        y: node.y,
        direction: 'east',
      },
      {
        id: 's-anchor',
        x: node.x,
        y: node.y + offset,
        direction: 'south',
      },
      {
        id: 'w-anchor',
        x: node.x - offset,
        y: node.y,
        direction: 'west',
      },
    ] as const;
  };

  /**
   * the anchor at the given event location
   */
  const getAnchor = ({ items, event }: GraphMouseEvent) => {
    if (event.button !== MOUSE_BUTTONS.left) return;
    const topItem = items.at(-1);
    if (!topItem || topItem.graphType !== 'node-anchor') return;
    const { id: anchorId } = topItem;
    return nodeAnchors.value.find((anchor) => anchor.id === anchorId);
  };

  const getUnprioritizedLinkPreviewSchema = () => {
    if (!parentNode.value || !currentDraggingAnchor.value) return;
    const { x, y } = currentDraggingAnchor.value;
    const start = { x: parentNode.value.x, y: parentNode.value.y };
    const end = { x, y };
    const { getTheme } = graph;

    const color = getTheme(
      'linkPreviewColor',
      parentNode.value,
      currentDraggingAnchor.value,
    );
    const width = getTheme(
      'linkPreviewWidth',
      parentNode.value,
      currentDraggingAnchor.value,
    );

    const shape = graph.shapes.line({
      id: 'link-preview',
      start,
      end,
      fillColor: color,
      lineWidth: width,
    });

    const schema: Omit<SchemaItem, 'priority'> = {
      id: 'link-preview',
      graphType: 'link-preview',
      shape,
    };

    return schema;
  };

  /**
   * checks if the users' cursor is hovering directly above a node, if so, sets it as parent
   */
  const checkForParentNodeUpdate = () => {
    if (currentDraggingAnchor.value) return;

    const { items } = graph.graphAtMousePosition.value;
    const topItem = items.at(-1);
    if (!topItem) return clearAnchorState();
    if (topItem.graphType === 'node-anchor') return;
    if (topItem.graphType !== 'node') return clearAnchorState();

    const newParentNode = graph.getNode(topItem.id);
    if (!newParentNode) {
      throw new Error('anchors: node shown on screen not in graph state');
    }

    if (newParentNode.id === parentNode.value?.id) return;
    setParentNode(newParentNode.id);
  };

  const setCurrentlyDraggingAnchor = (ev: GraphMouseEvent) => {
    if (!parentNode.value) return;
    /**
     * TODO shouldn't getAnchor be unnecessary here because the top item in this event should
     * point to the anchor itself?
     */
    const anchor = getAnchor(ev);
    if (!anchor) return;
    currentDraggingAnchor.value = anchor;
    graph.emit('onNodeAnchorDragStart', parentNode.value, anchor);
  };

  const updateCurrentlyDraggingAnchorPosition = ({
    coords,
  }: GraphMouseEvent) => {
    if (!currentDraggingAnchor.value) return;
    const { x, y } = coords;
    currentDraggingAnchor.value.x = x;
    currentDraggingAnchor.value.y = y;
  };

  /**
   * drops the active anchor and triggers graph events
   */
  const dropAnchor = () => {
    if (!currentDraggingAnchor.value) return;
    else if (!parentNode.value)
      throw new Error('active anchor without parent node');
    graph.emit(
      'onNodeAnchorDrop',
      parentNode.value,
      currentDraggingAnchor.value,
    );
    clearAnchorState();
  };

  const insertAnchorsIntoAggregator = (aggregator: SchemaItem[]) => {
    if (!parentNode.value) return aggregator;
    const anchors = getAnchorSchemas(parentNode.value);
    for (const anchor of anchors) aggregator.push(anchor);
    return aggregator;
  };

  const insertLinkPreviewIntoAggregator = (aggregator: SchemaItem[]) => {
    if (!parentNode.value || !currentDraggingAnchor.value) return aggregator;

    const { id: parentNodeId } = parentNode.value;

    prioritizeNode(parentNodeId, aggregator);

    const parentNodePriority = aggregator.find(
      (item) => item.id === parentNodeId,
    )?.priority;

    if (!parentNodePriority) return aggregator;

    const unprioritizedPreviewSchema = getUnprioritizedLinkPreviewSchema();

    if (!unprioritizedPreviewSchema) return aggregator;

    const linkPreviewSchema = {
      ...unprioritizedPreviewSchema,
      priority: parentNodePriority - 0.1,
    };

    aggregator.push(linkPreviewSchema);
    return aggregator;
  };

  graph.subscribeToAggregator.push(insertAnchorsIntoAggregator);
  graph.subscribeToAggregator.push(insertLinkPreviewIntoAggregator);

  const activate = () => {
    graph.subscribe('onNodeAdded', checkForParentNodeUpdate);
    graph.subscribe('onNodeRemoved', checkForParentNodeUpdate);
    graph.subscribe('onNodeMoved', clearAnchorState);
    graph.subscribe('onNodeDrop', updateNodeAnchors);
    graph.subscribe('onMouseMove', checkForParentNodeUpdate);
    graph.subscribe('onMouseMove', updateCurrentlyDraggingAnchorPosition);
    graph.subscribe('onMouseMove', updateHoveredNodeAnchorId);
    graph.subscribe('onMouseDown', setCurrentlyDraggingAnchor);
    graph.subscribe('onMouseUp', dropAnchor);
  };

  const deactivate = () => {
    graph.unsubscribe('onNodeAdded', checkForParentNodeUpdate);
    graph.unsubscribe('onNodeRemoved', checkForParentNodeUpdate);
    graph.unsubscribe('onNodeMoved', clearAnchorState);
    graph.unsubscribe('onNodeDrop', updateNodeAnchors);
    graph.unsubscribe('onMouseMove', checkForParentNodeUpdate);
    graph.unsubscribe('onMouseMove', updateCurrentlyDraggingAnchorPosition);
    graph.unsubscribe('onMouseMove', updateHoveredNodeAnchorId);
    graph.unsubscribe('onMouseDown', setCurrentlyDraggingAnchor);
    graph.unsubscribe('onMouseUp', dropAnchor);
    clearAnchorState();
  };

  graph.subscribe('onSettingsChange', (diff) => {
    if (diff.nodeAnchors === true) activate();
    else if (diff.nodeAnchors === false) deactivate();
  });

  if (graph.settings.value.nodeAnchors) activate();

  return {
    /**
     * the node anchor that is currently being dragged by the user
     */
    currentDraggingAnchor: readonly(currentDraggingAnchor),
    /**
     * the parent node of the active anchor
     */
    parentNode: readonly(parentNode),
    /**
     * set the parent node and spawn anchors around it
     */
    setParentNode,
  };
};

export type NodeAnchorControls = ReturnType<typeof useNodeAnchors>;
export type NodeAnchorPlugin = {
  /**
   * controls for managing node anchors in the graph
   */
  nodeAnchors: NodeAnchorControls;
};
