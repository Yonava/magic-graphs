import { createEventHub } from '@magic/graph-core-infra/events/createEventHub';
import { mergeEventHubs } from '@magic/graph-core-infra/events/mergeEventHubs';
import { CoreNode } from '@magic/graph-core-infra/types';
import { createThemeController } from '@magic/graph-plugins-shared/theme/createThemeController';
import { CoreEventMap } from '@magic/graph/core/events';
import type { CircleSchema } from '@magic/shapes/shapes/circle/types';
import type { WithId } from '@magic/shapes/types/index';
import { nullThrows } from '@magic/utils/assert';
import { MOUSE_BUTTONS } from '@magic/utils/mouse';

import { readonly, ref } from 'vue';

import { CanvasElement } from '../canvas/aggregator/types.ts';
import { CanvasEventMap, CanvasGraphMouseEvent } from '../canvas/events.ts';
import { CANVAS_ELEMENT_CURSOR_FIELD_KEY } from '../canvas/setupCanvasCursor.ts';
import { HoveredElement } from '../canvas/setupHoveredElement.ts';
import { FocusEventMap } from '../focus/events.ts';
import { ANCHOR_PLUGIN_ID } from './constants.ts';
import { createAnchorDragState } from './createAnchorDragState.ts';
import { createAnchorDragThemer } from './createAnchorDragThemer.ts';
import { AnchorsEventMap, createAnchorsEventRegistry } from './events.ts';
import { createAnchorsThemeOverrides } from './themes.ts';
import type { AnchorsPlugin, NodeAnchor } from './types.ts';

/**
 * anchors provide an additional layer of interaction by allowing nodes to spawn draggable anchors
 * when hovered over.
 *
 * helpful definitions:
 * - Anchor/Node Anchor: A draggable handle that spawns around the parent node.
 * - Parent Node: The node which anchors actively orbit around.
 * - Link Preview: The line that appears between the parent node and the anchor when the anchor is being dragged.
 */
export const anchors: AnchorsPlugin = (
  controls,
  graphEventHub,
  actions,
  getters,
) => {
  const anchorsEventRegistry = createAnchorsEventRegistry();
  const anchorsEventHub = createEventHub(anchorsEventRegistry);
  const events = mergeEventHubs<
    AnchorsEventMap,
    CoreEventMap & CanvasEventMap & FocusEventMap
  >(anchorsEventHub, graphEventHub);

  const theme = createThemeController(createAnchorsThemeOverrides());

  /**
   * The node which anchors actively orbit around
   */
  const parentNode = ref<CoreNode>();

  const anchorDragState = createAnchorDragState();
  const dragCursorTheme = createAnchorDragThemer(controls, anchorDragState);

  const hoveredNodeAnchorId = ref<NodeAnchor['id']>();

  const clearAnchorState = () => {
    parentNode.value = undefined;
    anchorDragState.stopDrag();
    hoveredNodeAnchorId.value = undefined;
  };

  const setParentNode = (nodeId: CoreNode['id']) => {
    const node = getters.getNode(nodeId);

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

  const getAnchorSchemas = (node: CoreNode) => {
    const color = theme._resolveToken('anchors.default.color', node);
    const focusColor = theme._resolveToken('anchors.parentFocused.color', node);

    const radius = theme._resolveToken('anchors.default.radius', node);
    const focusRadius = theme._resolveToken(
      'anchors.parentFocused.radius',
      node,
    );

    const anchorSchemas: CanvasElement[] = [];
    for (const anchor of nodeAnchors.value) {
      const { x, y, id } = anchor;

      const draggedAnchor = anchorDragState.getDragState()?.data;
      const isAnchorHovered = id === hoveredNodeAnchorId.value;
      const isAnchorDragged = id === draggedAnchor?.id;

      const isNodeFocused = controls.focus?.isFocused(node.id) ?? false;
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
        controls.canvas.shapes.shapes.circle(nodeAnchorSchema);

      anchorSchemas.push({
        id: anchor.id,
        graphType: 'node-anchor',
        shape: nodeAnchorShape,
        priority: 4,
        data: {
          [CANVAS_ELEMENT_CURSOR_FIELD_KEY]: theme._resolveToken(
            'anchors.default.cursor',
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
   * @param {CoreNode} node - the parent node of the anchor
   * @returns {void}
   */
  const updateNodeAnchors = (node: CoreNode | undefined) => {
    if (!node) return (nodeAnchors.value = []);
    const anchorToken = theme._resolveToken;
    const canvasToken = controls.canvas.theme._resolveToken;
    const focusToken = controls.focus?.theme._resolveToken;

    const isNodeFocused = controls.focus?.isFocused(node.id) ?? false;

    const anchorBaseRadius = anchorToken('anchors.default.radius', node);
    const anchorFocusRadius = anchorToken('anchors.parentFocused.radius', node);

    const anchorRadius = isNodeFocused ? anchorFocusRadius : anchorBaseRadius;

    const nodeBaseSize = canvasToken('node.default.size', node);
    const nodeFocusSize = focusToken?.('node.focus.size', node) ?? nodeBaseSize;

    const nodeSize = isNodeFocused ? nodeBaseSize : nodeFocusSize;

    const nodeBaseBorderWidth = canvasToken('node.default.border.width', node);
    const nodeFocusBorderWidth =
      focusToken?.('node.focus.border.width', node) ?? nodeBaseBorderWidth;

    const nodeBorderWidth = isNodeFocused
      ? nodeFocusBorderWidth
      : nodeBaseBorderWidth;

    const offset = nodeSize - anchorRadius / 3 + nodeBorderWidth / 2;
    const nodePosition = controls.positions.get(node.id);
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

  const resolveLinkPreviewCanvasElement = (elements: CanvasElement[]) => {
    const draggedAnchor = anchorDragState.getDragState()?.data;
    const currentParentNode = parentNode.value;
    if (!currentParentNode || !draggedAnchor) return;
    const { x, y } = draggedAnchor;
    const start = controls.positions.get(currentParentNode.id);
    const end = { x, y };

    const anchorToken = theme._resolveToken;

    const isFocused = controls.focus?.isFocused(currentParentNode.id) ?? false;

    const baseColor = anchorToken(
      'anchors.edge.preview.default.color',
      currentParentNode,
      draggedAnchor,
    );

    const focusColor = anchorToken(
      'anchors.edge.preview.parentFocused.color',
      currentParentNode,
      draggedAnchor,
    );

    const color = isFocused ? focusColor : baseColor;

    const baseWidth = anchorToken(
      'anchors.edge.preview.default.width',
      currentParentNode,
      draggedAnchor,
    );

    const focusWidth = anchorToken(
      'anchors.edge.preview.parentFocused.width',
      currentParentNode,
      draggedAnchor,
    );

    const width = isFocused ? focusWidth : baseWidth;

    const shape = controls.canvas.shapes.shapes.line({
      id: 'link-preview',
      start,
      end,
      fillColor: color,
      lineWidth: width,
    });

    const element: CanvasElement = {
      id: 'link-preview',
      graphType: 'link-preview',
      priority: controls.canvas.getNodePriority()(currentParentNode.id) - 0.001,
      shape,
    };

    return element;
  };

  /**
   * checks if the users' cursor is hovering directly above a node, if so, sets it as parent
   */
  const checkForParentNodeUpdate = () => {
    const draggedAnchor = anchorDragState.getDragState()?.data;
    if (draggedAnchor) return;

    const { elements: items } = controls.canvas.graphUnderCursor;
    const topItem = items.at(-1);
    if (!topItem) return clearAnchorState();
    if (topItem.graphType === 'node-anchor') return;
    if (topItem.graphType !== 'node') return clearAnchorState();

    const newParentNode = getters.getNode(topItem.id);
    if (!newParentNode) {
      throw new Error('anchors: node shown on screen not in graph state');
    }

    if (newParentNode.id === parentNode.value?.id) return;
    setParentNode(newParentNode.id);
  };

  const clearAnchorStateIfParentRemoved = (
    nodeIds: readonly CoreNode['id'][],
  ) => {
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
    controls.canvas.aggregator.updateAggregator();
    controls.canvas.forceUpdateGraphUnderCursor();

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

    const linkPreviewCanvasElement =
      resolveLinkPreviewCanvasElement(aggregator);
    if (!linkPreviewCanvasElement) return aggregator;

    aggregator.push(linkPreviewCanvasElement);
    return aggregator;
  };

  controls.canvas.aggregator.transformers.push(insertAnchorsIntoAggregator);
  controls.canvas.aggregator.transformers.push(insertLinkPreviewIntoAggregator);

  const consumeOnElementHoverEvent = (
    _: HoveredElement['value'] | undefined,
    __: HoveredElement['value'] | undefined,
    consume: () => void,
  ) => {
    if (anchorDragState.isDragging()) consume();
  };

  const enable = () => {
    events.handle(
      'onNodesRemoved',
      clearAnchorStateIfParentRemoved,
      ANCHOR_PLUGIN_ID,
    );
    events.handle('onNodeMoveStreamStart', clearAnchorState, ANCHOR_PLUGIN_ID);

    // when the user is mousing over the canvas. checks if a node is under the cursor
    // to set the anchors on. onGraphUnderCursorChange because onMouseMove doesn't capture
    // the cases where the canvas state changes under the cursor while the cursor is
    // stationary, ie node being added via double click
    events.handle(
      'onGraphUnderCursorChange',
      checkForParentNodeUpdate,
      ANCHOR_PLUGIN_ID,
    );

    // when a node is finished dragging, set the dropped node as anchor parent
    events.handle('onMouseUp', checkForParentNodeUpdate, ANCHOR_PLUGIN_ID);

    // if an anchor is being dragged, update its position
    events.handle(
      'onMouseMove',
      updateCurrentlyDraggingAnchorPosition,
      ANCHOR_PLUGIN_ID,
    );

    // scans the canvas when the cursor is moving and sets the hovered node anchor state
    events.handle('onMouseMove', updateHoveredNodeAnchorId, ANCHOR_PLUGIN_ID);

    // picks up the node anchor to begin drag
    events.handle('onMouseDown', setCurrentlyDraggingAnchor, ANCHOR_PLUGIN_ID);

    // drop the node anchor being dragged
    events.handle('onMouseUp', dropAnchor, ANCHOR_PLUGIN_ID);

    // prevents fast mouse movement from updating the hovered element to the destination node mid-drag
    events.handle(
      'onHoveredElementChange',
      consumeOnElementHoverEvent,
      ANCHOR_PLUGIN_ID,
      {
        before: ['plugins/canvas'],
      },
    );

    dragCursorTheme.enable();
  };

  const disable = () => {
    events.unhandle('onNodesRemoved', clearAnchorStateIfParentRemoved);
    events.unhandle('onNodeMoveStreamStart', clearAnchorState);
    events.unhandle('onGraphUnderCursorChange', checkForParentNodeUpdate);
    events.unhandle('onMouseMove', updateCurrentlyDraggingAnchorPosition);
    events.unhandle('onMouseMove', updateHoveredNodeAnchorId);
    events.unhandle('onMouseDown', setCurrentlyDraggingAnchor);
    events.unhandle('onMouseUp', dropAnchor);
    events.unhandle('onHoveredElementChange', consumeOnElementHoverEvent);
    clearAnchorState();
    dragCursorTheme.disable();
  };

  enable();

  return {
    events,
    actions,
    getters,
    controls: {
      anchors: {
        lifecycle: {
          enable,
          disable,
        },
        theme,
        parentNode: readonly(parentNode),
        setParentNode,
        clearAnchorState,
      },
    },
  };
};
