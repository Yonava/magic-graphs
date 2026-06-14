import type { CircleSchema } from '@magic/shapes/shapes/circle/types';
import type { WithId } from '@magic/shapes/types/index';
import { MOUSE_BUTTONS } from '@magic/utils/mouse';

import { readonly, ref } from 'vue';

import { CoreEventMap } from '../../core/events.ts';
import type { CoreGraph } from '../../core/types.ts';
import { EventHub, createEventHub } from '../../events/createEventHub.ts';
import { mergeEventHubs } from '../../events/mergeEventHubs.ts';
import type {
  GraphWithNodeAnchor,
  NodeAnchor,
} from '../../plugins/anchors/types.ts';
import type { GNode } from '../../types.ts';
import { CanvasEventMap, CanvasGraphMouseEvent } from '../canvas/events.ts';
import { CANVAS_ELEMENT_CURSOR_FIELD_KEY } from '../canvas/setupCanvasCursor.ts';
import { CanvasElement, CanvasPlugin } from '../canvas/types.ts';
import { createAnchorDragState } from './createAnchorDragState.ts';
import { NodeAnchorEventMap, createNodeAnchorEventRegistry } from './events.ts';
import { useAnchorDragCursor } from './useAnchorDragCursor.ts';

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
  EventMap extends CoreEventMap & CanvasEventMap,
  Plugins extends CanvasPlugin,
>(
  graph: CoreGraph<TransactionWrapperOptions, EventMap, Plugins>,
): GraphWithNodeAnchor<TransactionWrapperOptions, EventMap, Plugins> => {
  const nodeAnchorRegistry = createNodeAnchorEventRegistry();
  const nodeAnchorHub: EventHub<NodeAnchorEventMap> =
    createEventHub(nodeAnchorRegistry);
  const events = mergeEventHubs(
    nodeAnchorHub,
    // casting because graph.events could be arbitrarily due to it being stuffed with other events
    // from plugins upstream
    graph.events as EventHub<CoreEventMap & CanvasEventMap>,
  );
  /**
   * The node which anchors actively orbit around
   */
  const parentNode = ref<GNode>();

  const anchorDragState = createAnchorDragState();
  const dragCursorTheme = useAnchorDragCursor(
    graph.canvas.theme.createLayer,
    anchorDragState,
  );

  const hoveredNodeAnchorId = ref<NodeAnchor['id']>();

  const clearAnchorState = () => {
    parentNode.value = undefined;
    anchorDragState.stopDrag();
    hoveredNodeAnchorId.value = undefined;
  };

  const setParentNode = (nodeId: GNode['id']) => {
    const node = graph.getNode(nodeId);

    if (!node) throw new Error('node not found');

    parentNode.value = node;
    updateNodeAnchors(node);
  };

  const updateHoveredNodeAnchorId = ({
    elements: items,
  }: CanvasGraphMouseEvent) => {
    const topItem = items.at(-1);
    if (!topItem) return (hoveredNodeAnchorId.value = undefined);

    hoveredNodeAnchorId.value = topItem.id;
  };

  const getAnchorSchemas = (node: GNode) => {
    const { _resolveToken: resolveToken } = graph.canvas.theme;

    const color = resolveToken('nodeAnchor.default.color', node);
    const focusColor = resolveToken('nodeAnchor.focus.color', node);
    const radius = resolveToken('nodeAnchor.default.radius', node);
    const focusRadius = resolveToken('nodeAnchor.focus.radius', node);

    const anchorSchemas: CanvasElement[] = [];
    for (const anchor of nodeAnchors.value) {
      const { x, y, id } = anchor;

      const draggedAnchor = anchorDragState.getDragState()?.data;
      const isAnchorHovered = id === hoveredNodeAnchorId.value;
      const isAnchorDragged = id === draggedAnchor?.id;

      // @ts-expect-error https://github.com/Yonava/magic-graphs/issues/574
      const isNodeFocused = graph.focus.isFocused(node.id);
      const isFocused = isNodeFocused || isAnchorHovered || isAnchorDragged;

      const nodeAnchorSchema: WithId<CircleSchema> = {
        id,
        at: { x, y },
        radius: isFocused ? focusRadius : radius,
        fillColor: isFocused ? focusColor : color,
      };

      if (draggedAnchor && draggedAnchor.direction === anchor.direction) {
        nodeAnchorSchema.at.x = draggedAnchor.x;
        nodeAnchorSchema.at.y = draggedAnchor.y;
      }

      const nodeAnchorShape =
        graph.canvas.shapes.shapes.circle(nodeAnchorSchema);

      const beingDragged = anchor.id === draggedAnchor?.id;
      anchorSchemas.push({
        id: anchor.id,
        graphType: 'node-anchor',
        shape: nodeAnchorShape,
        priority: beingDragged ? Infinity : 99_999,
        data: {
          [CANVAS_ELEMENT_CURSOR_FIELD_KEY]: resolveToken(
            'nodeAnchor.default.cursor',
            node,
          ),
        },
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
    const { _resolveToken: resolveToken } = graph.canvas.theme;

    // @ts-expect-error https://github.com/Yonava/magic-graphs/issues/574
    const isNodeFocused = graph.focus.isFocused(node.id);

    const anchorBaseRadius = resolveToken('nodeAnchor.default.radius', node);
    const anchorFocusRadius = resolveToken('nodeAnchor.focus.radius', node);

    const anchorRadius = isNodeFocused ? anchorFocusRadius : anchorBaseRadius;

    const nodeBaseSize = resolveToken('node.default.size', node);
    const nodeFocusSize = resolveToken('node.focus.size', node);

    const nodeSize = isNodeFocused ? nodeBaseSize : nodeFocusSize;

    const nodeBaseBorderWidth = resolveToken('node.default.borderWidth', node);
    const nodeFocusBorderWidth = resolveToken('node.focus.borderWidth', node);

    const nodeBorderWidth = isNodeFocused
      ? nodeFocusBorderWidth
      : nodeBaseBorderWidth;

    const offset = nodeSize - anchorRadius / 3 + nodeBorderWidth / 2;
    const nodePosition = graph.positions.get(node.id);
    nodeAnchors.value = [
      {
        id: 'n-anchor',
        x: nodePosition.x,
        y: nodePosition.y - offset,
        direction: 'north',
      },
      {
        id: 'e-anchor',
        x: nodePosition.x + offset,
        y: nodePosition.y,
        direction: 'east',
      },
      {
        id: 's-anchor',
        x: nodePosition.x,
        y: nodePosition.y + offset,
        direction: 'south',
      },
      {
        id: 'w-anchor',
        x: nodePosition.x - offset,
        y: nodePosition.y,
        direction: 'west',
      },
    ] as const;
  };

  /**
   * the anchor at the given event location
   */
  const getAnchor = ({ elements: items, event }: CanvasGraphMouseEvent) => {
    if (event.button !== MOUSE_BUTTONS.left) return;
    const topItem = items.at(-1);
    if (!topItem || topItem.graphType !== 'node-anchor') return;
    const { id: anchorId } = topItem;
    return nodeAnchors.value.find((anchor) => anchor.id === anchorId);
  };

  const getUnprioritizedLinkPreviewSchema = () => {
    const draggedAnchor = anchorDragState.getDragState()?.data;
    if (!parentNode.value || !draggedAnchor) return;
    const { x, y } = draggedAnchor;
    const start = graph.positions.get(parentNode.value.id);
    const end = { x, y };
    const { _resolveToken: resolveToken } = graph.canvas.theme;

    // @ts-expect-error https://github.com/Yonava/magic-graphs/issues/574
    const isFocused = graph.focus.isFocused(parentNode.value.id);

    const baseColor = resolveToken(
      'nodeAnchor.default.linkPreview.color',
      parentNode.value,
      draggedAnchor,
    );

    const focusColor = resolveToken(
      'nodeAnchor.focus.linkPreview.color',
      parentNode.value,
      draggedAnchor,
    );

    const color = isFocused ? focusColor : baseColor;

    const baseWidth = resolveToken(
      'nodeAnchor.default.linkPreview.width',
      parentNode.value,
      draggedAnchor,
    );

    const focusWidth = resolveToken(
      'nodeAnchor.focus.linkPreview.width',
      parentNode.value,
      draggedAnchor,
    );

    const width = isFocused ? focusWidth : baseWidth;

    const shape = graph.canvas.shapes.shapes.line({
      id: 'link-preview',
      start,
      end,
      fillColor: color,
      lineWidth: width,
    });

    const schema: Omit<CanvasElement, 'priority'> = {
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
    const draggedAnchor = anchorDragState.getDragState()?.data;
    if (draggedAnchor) return;

    const { elements: items } = graph.canvas.graphUnderCursor;
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

  const clearAnchorStateIfParentRemoved = (nodeIds: readonly GNode['id'][]) => {
    if (parentNode.value && nodeIds.includes(parentNode.value.id)) {
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
    anchorDragState.startDrag(ev.coords, anchor);
    events.emit('onNodeAnchorDragStart', parentNode.value, anchor);
  };

  const updateCurrentlyDraggingAnchorPosition = ({
    coords,
  }: CanvasGraphMouseEvent) => anchorDragState.applyMove(coords);

  /**
   * drops the active anchor and triggers onNodeAnchorDrop event
   */
  const dropAnchor = () => {
    const draggedAnchor = anchorDragState.getDragState()?.data;
    if (!draggedAnchor) return;
    else if (!parentNode.value)
      throw new Error('active anchor without parent node');
    events.emit('onNodeAnchorDrop', parentNode.value, draggedAnchor);
    clearAnchorState();

    // when we clear the node anchors, we must ensure that the
    // aggregator updates so that it knows the node anchors
    // and link preview are no longer on the canvas
    graph.canvas.aggregator.updateAggregator();
    graph.canvas.forceUpdateGraphUnderCursor();

    // in case anchor was dropped a different node, set that new node as the parent node
    checkForParentNodeUpdate();
  };

  const insertAnchorsIntoAggregator = (aggregator: CanvasElement[]) => {
    if (!parentNode.value) return aggregator;
    const anchors = getAnchorSchemas(parentNode.value);
    for (const anchor of anchors) aggregator.push(anchor);
    return aggregator;
  };

  const insertLinkPreviewIntoAggregator = (aggregator: CanvasElement[]) => {
    const draggedAnchor = anchorDragState.getDragState()?.data;
    if (!parentNode.value || !draggedAnchor) return aggregator;

    const { id: parentNodeId } = parentNode.value;

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
    events.handle(
      'onNodesRemoved',
      clearAnchorStateIfParentRemoved,
      ANCHOR_EVENT_ID,
    );
    events.handle('onNodeMoveStreamStart', clearAnchorState, ANCHOR_EVENT_ID);

    // for when the user is mousing over the canvas. checks if a node is under the cursor
    // to set the anchors on. onGraphUnderCursorChange because onMouseMove doesn't capture
    // the cases where the canvas state changes under the cursor while the cursor is
    // stationary, ie node being added via double click
    events.handle(
      'onGraphUnderCursorChange',
      checkForParentNodeUpdate,
      ANCHOR_EVENT_ID,
    );

    // for when a node is finished dragging, set the dropped node as anchor parent
    events.handle('onMouseUp', checkForParentNodeUpdate, ANCHOR_EVENT_ID);

    // if an anchor is being dragged, update its position
    events.handle(
      'onMouseMove',
      updateCurrentlyDraggingAnchorPosition,
      ANCHOR_EVENT_ID,
    );

    // scans the canvas when the cursor is moving and sets the hovered node anchor state
    events.handle('onMouseMove', updateHoveredNodeAnchorId, ANCHOR_EVENT_ID);

    // picks up the node anchor to begin drag
    events.handle('onMouseDown', setCurrentlyDraggingAnchor, ANCHOR_EVENT_ID);

    // drop the node anchor being dragged
    events.handle('onMouseUp', dropAnchor, ANCHOR_EVENT_ID);

    // TODO this is triggered twice! https://github.com/Yonava/magic-graphs/issues/664
    // console.log('activating');
    dragCursorTheme.activate();
  };

  const deactivate = () => {
    events.unhandle('onNodesRemoved', clearAnchorStateIfParentRemoved);
    events.unhandle('onNodeMoveStreamStart', clearAnchorState);
    events.unhandle('onGraphUnderCursorChange', checkForParentNodeUpdate);
    events.unhandle('onMouseMove', updateCurrentlyDraggingAnchorPosition);
    events.unhandle('onMouseMove', updateHoveredNodeAnchorId);
    events.unhandle('onMouseDown', setCurrentlyDraggingAnchor);
    events.unhandle('onMouseUp', dropAnchor);
    clearAnchorState();
    dragCursorTheme.deactivate();
  };

  activate();

  return {
    ...graph,
    events,
    nodeAnchor: {
      activate,
      deactivate,
      parentNode: readonly(parentNode),
      setParentNode,
      clearAnchorState,
    },
  };
};
