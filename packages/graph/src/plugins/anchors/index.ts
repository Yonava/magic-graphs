import type { CircleSchema } from '@magic/shapes/shapes/circle/types';
import type { WithId } from '@magic/shapes/types/index';
import { MOUSE_BUTTONS } from '@magic/utils/mouse';

import { readonly, ref } from 'vue';

import { BaseEventMap } from '../../base/events.ts';
import type { BaseGraph } from '../../base/types.ts';
import { EventHub, createEventHub } from '../../events/createEventHub.ts';
import { mergeEventHubs } from '../../events/mergeEventHubs.ts';
import { prioritizeNode } from '../../helpers/prioritization.ts';
import type {
  GraphWithNodeAnchor,
  NodeAnchor,
} from '../../plugins/anchors/types.ts';
import type { GNode, SchemaItem } from '../../types.ts';
import { CanvasEventMap, CanvasGraphMouseEvent } from '../canvas/events.ts';
import { CanvasPlugin } from '../canvas/types.ts';
import { NodeAnchorEventMap, createNodeAnchorEventRegistry } from './events.ts';

export const ANCHOR_EVENT_ID = 'anchors';

/**
 * node anchors provide an additional layer of interaction by allowing nodes to spawn draggable anchors
 * when hovered over.
 *
 * helpful definitions:
 * - Anchor/Node Anchor: A draggable handle that spawns around the parent node.
 * - Parent Node: The node which anchors actively orbit around.
 * - Link Preview: The line that appears between the parent node and the anchor when the anchor is being dragged.
 */
export const useNodeAnchorPlugin = <
  TransactionWrapperOptions,
  EventMap extends BaseEventMap & CanvasEventMap,
  Plugins extends CanvasPlugin,
>(
  graph: BaseGraph<TransactionWrapperOptions, EventMap, Plugins>,
): GraphWithNodeAnchor<TransactionWrapperOptions, EventMap, Plugins> => {
  const nodeAnchorRegistry = createNodeAnchorEventRegistry();
  const nodeAnchorHub: EventHub<NodeAnchorEventMap> = createEventHub(
    nodeAnchorRegistry,
    ANCHOR_EVENT_ID,
  );
  const events = mergeEventHubs(
    nodeAnchorHub,
    // casting because graph.events could be arbitrarily due to it being stuffed with other events
    // from plugins upstream
    graph.events as EventHub<BaseEventMap & CanvasEventMap>,
  );
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

  const clearAnchorStateOnNodeMove: BaseEventMap['onNodeUpdated'] = (
    _,
    previousValues,
  ) => {
    if (previousValues.x || previousValues.y) clearAnchorState();
  };

  const setParentNode = (nodeId: GNode['id']) => {
    if (graph.settings.value.nodeAnchors === false) return;

    const node = graph.getNode(nodeId);

    if (!node) throw new Error('node not found');

    parentNode.value = node;
    updateNodeAnchors(node);
  };

  const hoveredNodeAnchorId = ref<NodeAnchor['id']>();

  const updateHoveredNodeAnchorId = ({ items }: CanvasGraphMouseEvent) => {
    const topItem = items.at(-1);
    if (!topItem) return (hoveredNodeAnchorId.value = undefined);

    hoveredNodeAnchorId.value = topItem.id;
  };

  const getAnchorSchemas = (node: GNode) => {
    const { getTheme } = graph;

    const color = getTheme('nodeAnchor.base.color', node);
    const focusColor = getTheme('nodeAnchor.focus.color', node);
    const radius = getTheme('nodeAnchor.base.radius', node);
    const focusRadius = getTheme('nodeAnchor.focus.radius', node);

    const anchorSchemas: SchemaItem[] = [];
    for (const anchor of nodeAnchors.value) {
      const { x, y, id } = anchor;

      const isAnchorHovered = id === hoveredNodeAnchorId.value;
      const isAnchorDragged = id === currentDraggingAnchor.value?.id;

      // @ts-expect-error https://github.com/Yonava/magic-graphs/issues/574
      const isNodeFocused = graph.focus.isFocused(node.id);
      const isFocused = isNodeFocused || isAnchorHovered || isAnchorDragged;

      const nodeAnchorSchema: WithId<CircleSchema> = {
        id,
        at: { x, y },
        radius: isFocused ? focusRadius : radius,
        fillColor: isFocused ? focusColor : color,
      };

      if (
        currentDraggingAnchor.value &&
        currentDraggingAnchor.value.direction === anchor.direction
      ) {
        nodeAnchorSchema.at.x = currentDraggingAnchor.value.x;
        nodeAnchorSchema.at.y = currentDraggingAnchor.value.y;
      }

      const nodeAnchorShape =
        graph.canvas.shapes.shapes.circle(nodeAnchorSchema);

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

    // @ts-expect-error https://github.com/Yonava/magic-graphs/issues/574
    const isNodeFocused = graph.focus.isFocused(node.id);

    const anchorBaseRadius = getTheme('nodeAnchor.base.radius', node);
    const anchorFocusRadius = getTheme('nodeAnchor.focus.radius', node);

    const anchorRadius = isNodeFocused ? anchorFocusRadius : anchorBaseRadius;

    const nodeBaseSize = getTheme('node.base.size', node);
    const nodeFocusSize = getTheme('node.focus.size', node);

    const nodeSize = isNodeFocused ? nodeBaseSize : nodeFocusSize;

    const nodeBaseBorderWidth = getTheme('node.base.borderWidth', node);
    const nodeFocusBorderWidth = getTheme('node.focus.borderWidth', node);

    const nodeBorderWidth = isNodeFocused
      ? nodeFocusBorderWidth
      : nodeBaseBorderWidth;

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
  const getAnchor = ({ items, event }: CanvasGraphMouseEvent) => {
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

    // @ts-expect-error https://github.com/Yonava/magic-graphs/issues/574
    const isFocused = graph.focus.isFocused(parentNode.value.id);

    const baseColor = getTheme(
      'nodeAnchor.base.linkPreviewColor',
      parentNode.value,
      currentDraggingAnchor.value,
    );

    const focusColor = getTheme(
      'nodeAnchor.focus.linkPreviewColor',
      parentNode.value,
      currentDraggingAnchor.value,
    );

    const color = isFocused ? focusColor : baseColor;

    const baseWidth = getTheme(
      'nodeAnchor.base.linkPreviewWidth',
      parentNode.value,
      currentDraggingAnchor.value,
    );

    const focusWidth = getTheme(
      'nodeAnchor.focus.linkPreviewWidth',
      parentNode.value,
      currentDraggingAnchor.value,
    );

    const width = isFocused ? focusWidth : baseWidth;

    const shape = graph.canvas.shapes.shapes.line({
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

    const { items } = graph.canvas.graphAtMousePosition.value;
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

  const clearAnchorStateIfParentRemoved = (nodeId: GNode['id']) => {
    if (parentNode.value?.id === nodeId) {
      clearAnchorState();
    }
  };

  const setCurrentlyDraggingAnchor = (ev: CanvasGraphMouseEvent) => {
    if (!parentNode.value) return;
    /**
     * TODO shouldn't getAnchor be unnecessary here because the top item in this event should
     * point to the anchor itself?
     */
    const anchor = getAnchor(ev);
    if (!anchor) return;
    currentDraggingAnchor.value = anchor;
    events.emit('onNodeAnchorDragStart', parentNode.value, anchor);
  };

  const updateCurrentlyDraggingAnchorPosition = ({
    coords,
  }: CanvasGraphMouseEvent) => {
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
    events.emit(
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

  graph.canvas.aggregator.transformers.push(insertAnchorsIntoAggregator);
  graph.canvas.aggregator.transformers.push(insertLinkPreviewIntoAggregator);

  const activate = () => {
    events.handle('onNodeAdded', checkForParentNodeUpdate, ANCHOR_EVENT_ID);
    events.handle('onNodeRemoved', checkForParentNodeUpdate, ANCHOR_EVENT_ID);
    events.handle(
      'onNodeRemoved',
      clearAnchorStateIfParentRemoved,
      ANCHOR_EVENT_ID,
    );
    events.handle('onNodeUpdated', clearAnchorStateOnNodeMove, ANCHOR_EVENT_ID);
    // TODO replace with core/base discrete node position change API
    // events.handle('onNodeDrop', updateNodeAnchors, ANCHOR_EVENT_ID);
    events.handle('onMouseMove', checkForParentNodeUpdate, ANCHOR_EVENT_ID);
    events.handle(
      'onMouseMove',
      updateCurrentlyDraggingAnchorPosition,
      ANCHOR_EVENT_ID,
    );
    events.handle('onMouseMove', updateHoveredNodeAnchorId, ANCHOR_EVENT_ID);
    events.handle('onMouseDown', setCurrentlyDraggingAnchor, ANCHOR_EVENT_ID);
    events.handle('onMouseUp', dropAnchor, ANCHOR_EVENT_ID);
  };

  const deactivate = () => {
    events.unhandle('onNodeAdded', checkForParentNodeUpdate);
    events.unhandle('onNodeRemoved', checkForParentNodeUpdate);
    events.unhandle('onNodeRemoved', clearAnchorStateIfParentRemoved);
    events.unhandle('onNodeUpdated', clearAnchorStateOnNodeMove);
    // TODO replace with core/base discrete node position change API
    // events.unhandle('onNodeDrop', updateNodeAnchors);
    events.unhandle('onMouseMove', checkForParentNodeUpdate);
    events.unhandle('onMouseMove', updateCurrentlyDraggingAnchorPosition);
    events.unhandle('onMouseMove', updateHoveredNodeAnchorId);
    events.unhandle('onMouseDown', setCurrentlyDraggingAnchor);
    events.unhandle('onMouseUp', dropAnchor);
    clearAnchorState();
  };

  events.subscribe('onSettingsChange', (diff) => {
    if (diff.nodeAnchors === true) activate();
    else if (diff.nodeAnchors === false) deactivate();
  });

  if (graph.settings.value.nodeAnchors) activate();

  return {
    ...graph,
    events,
    nodeAnchor: {
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
      clearAnchorState,
    },
  };
};
