import { ElementRemovalPayload } from '@magic/graph/core/actions/types';
import { CoreEventMap } from '@magic/graph/core/events';
import { createEventHub } from '@magic/graph/events/createEventHub';
import { mergeEventHubs } from '@magic/graph/events/mergeEventHubs';
import { GEdge, GNode } from '@magic/graph/types';
import { nullThrows } from '@magic/utils/assert';
import { getCtx } from '@magic/utils/ctx/index';
import { MOUSE_BUTTONS } from '@magic/utils/mouse';
import { DeepReadonly } from 'ts-essentials';

import { computed, readonly, ref } from 'vue';

import { CanvasEventMap, CanvasGraphMouseEvent } from '../canvas/events.ts';
import { CanvasElement } from '../canvas/types.ts';
import {
  FOCUSABLE_GRAPH_TYPES,
  FOCUS_EVENT_ID,
  FOCUS_THEME_ID,
} from './constants.ts';
import { FocusEventMap, createFocusEventRegistry } from './events.ts';
import {
  EdgeBaseThemePath,
  EdgeBaseToNodeFocusTheme,
  FocusPlugin,
  NodeBaseThemePath,
  NodeBaseToNodeFocusTheme,
} from './types.ts';

export const focus: FocusPlugin = (graph, graphEventHub, actions) => {
  const focusEventRegistry = createFocusEventRegistry();
  const focusEventHub = createEventHub(focusEventRegistry);
  const events = mergeEventHubs<FocusEventMap, CoreEventMap & CanvasEventMap>(
    focusEventHub,
    graphEventHub,
  );

  const focusedElementIds = ref(new Set<string>());

  const setFocus = (ids: string[]) => {
    const elementsAlreadyFocused = ids.every((id) =>
      focusedElementIds.value.has(id),
    );
    if (ids.length > 0 && elementsAlreadyFocused) return;

    const oldIds = new Set([...focusedElementIds.value]);
    focusedElementIds.value = new Set(ids);

    events.emit('onFocusChange', focusedElementIds.value, oldIds);
  };

  const clearFocus = () => setFocus([]);

  const addToFocus = (id: string | Readonly<string[]>) => {
    const elementsAddedToFocus = typeof id === 'object' ? id : [id];
    const nonExistingElementIds = new Set(
      elementsAddedToFocus.filter(
        (newId) => !graph.getNode(newId) && !graph.getEdge(newId),
      ),
    );
    if (nonExistingElementIds.size) {
      console.warn(
        `Attempted to focus non-existent items`,
        nonExistingElementIds,
      );
    }
    const stagedElementIds = elementsAddedToFocus.filter(
      (newId) =>
        !focusedElementIds.value.has(newId) &&
        !nonExistingElementIds.has(newId),
    );
    if (stagedElementIds.length === 0) return;

    const previousFocusedElementIds = new Set([...focusedElementIds.value]);
    const newFocusedElementIds = new Set([
      ...stagedElementIds,
      ...previousFocusedElementIds,
    ]);
    focusedElementIds.value = newFocusedElementIds;
    events.emit(
      'onFocusChange',
      newFocusedElementIds,
      previousFocusedElementIds,
    );
  };

  const handleTextArea = (canvasElement: CanvasElement) => {
    const ctx = getCtx(graph.canvas.magicCanvas.canvas);

    canvasElement.shape.startTextAreaEdit?.(ctx, (textAreaContent) => {
      const edge = nullThrows(
        graph.getEdge(canvasElement.id),
        `Only edges may include TextAreas: Got ${canvasElement.graphType}`,
      );

      const newWeight = graph.settings.value.edgeInputToWeight(textAreaContent);
      if (
        newWeight === undefined ||
        edge.weight.valueOf() === newWeight.valueOf()
      ) {
        return;
      }

      actions.updateEdge({
        id: edge.id,
        values: { weight: newWeight },
      });
    });
  };

  const clearRemovedElementsFromFocus = ({
    removedNodeIds,
    removedEdgeIds,
  }: DeepReadonly<ElementRemovalPayload>) => {
    const hasRemovedFocus =
      removedNodeIds.some(isFocused) || removedEdgeIds.some(isFocused);

    if (!hasRemovedFocus) return;

    const removedIds = new Set<string>([...removedNodeIds, ...removedEdgeIds]);

    const newFocusedIds = Array.from(focusedElementIds.value).filter(
      (id) => !removedIds.has(id),
    );

    setFocus(newFocusedIds);
  };

  const handleMouseDown = ({
    elements: items,
    coords,
    event,
  }: CanvasGraphMouseEvent) => {
    if (event.button !== MOUSE_BUTTONS.left) return;
    const topItem = items.at(-1);
    if (!topItem) {
      return event.shiftKey ? undefined : clearFocus();
    }

    // handle text areas
    const inATextArea = topItem.shape.textHitbox?.(coords);
    const canEdit =
      inATextArea &&
      graph.settings.value.edgeLabelsEditable &&
      topItem.graphType === 'edge';

    if (canEdit) {
      clearFocus();
      return handleTextArea(topItem);
    }

    const canFocus = FOCUSABLE_GRAPH_TYPES.some(
      (type) => type === topItem.graphType,
    );
    if (!canFocus) return;

    if (event.shiftKey) addToFocus(topItem.id);
    else setFocus([topItem.id]);
  };

  const focusAll = () => {
    const nodeIds = graph.nodes.value.map((node) => node.id);
    const edgeIds = graph.edges.value.map((edge) => edge.id);
    setFocus([...nodeIds, ...edgeIds]);
  };

  const isFocused = (id: string) => focusedElementIds.value.has(id);

  const nodeBaseStylePathMapping: NodeBaseToNodeFocusTheme = {
    'node.default.cursor': 'node.focus.cursor',
    'node.default.color': 'node.focus.color',
    'node.default.borderColor': 'node.focus.borderColor',
    'node.default.borderWidth': 'node.focus.borderWidth',
    'node.default.size': 'node.focus.size',
    'node.default.shape': 'node.focus.shape',
    'node.default.textColor': 'node.focus.textColor',
    'node.default.textSize': 'node.focus.textSize',
    'node.default.textFontWeight': 'node.focus.textFontWeight',
    'node.default.text': 'node.focus.text',
  };

  const edgeBaseStylePathMapping: EdgeBaseToNodeFocusTheme = {
    'edge.default.color': 'edge.focus.color',
    'edge.default.width': 'edge.focus.width',
    'edge.default.shape': 'edge.focus.shape',
    'edge.default.textColor': 'edge.focus.textColor',
    'edge.default.textSize': 'edge.focus.textSize',
    'edge.default.textFontWeight': 'edge.focus.textFontWeight',
    'edge.default.text': 'edge.focus.text',
  };

  const nodeEntries = Object.entries(nodeBaseStylePathMapping);
  const edgeEntries = Object.entries(edgeBaseStylePathMapping);

  const { set: setThemeOverrideLayer } =
    graph.canvas.theme.createLayer(FOCUS_THEME_ID);

  for (const [nodeBasePath, nodeFocusPath] of nodeEntries) {
    setThemeOverrideLayer(nodeBasePath as NodeBaseThemePath, (node: GNode) => {
      if (!isFocused(node.id)) return;
      // typescript generics to differentiate each callbacks individual
      // return type is juice not worth the squeeze
      return graph.canvas.theme._resolveToken(nodeFocusPath, node, {
        ...graph,
        shapes: graph.canvas.shapes,
        resolveToken: graph.canvas.theme._resolveToken,
      }) as any;
    });
  }

  for (const [edgeBasePath, edgeFocusPath] of edgeEntries) {
    setThemeOverrideLayer(edgeBasePath as EdgeBaseThemePath, (edge: GEdge) => {
      if (!isFocused(edge.id)) return;
      // typescript generics to differentiate each callbacks individual
      // return type is juice not worth the squeeze
      return graph.canvas.theme._resolveToken(edgeFocusPath, edge, {
        ...graph,
        shapes: graph.canvas.shapes,
        resolveToken: graph.canvas.theme._resolveToken,
      }) as any;
    });
  }

  const activate = () => {
    // focus a node when clicked, or clear focus if background is clicked
    events.handle('onMouseDown', handleMouseDown, FOCUS_EVENT_ID, {
      before: ['plugins/drag'],
    });

    // clean up the focus so removed elements aren't in the state
    events.subscribe('onElementsRemoved', clearRemovedElementsFromFocus);
  };

  const deactivate = () => {
    events.unhandle('onMouseDown', handleMouseDown);

    events.unsubscribe('onElementsRemoved', clearRemovedElementsFromFocus);
    clearFocus();
  };

  activate();

  const extendedActions: ReturnType<FocusPlugin>['actions'] = {
    ...actions,
    addNode: (options) => {
      const addedNode = actions.addNode(options);
      const focusOnAdded = options?.focus ?? true;
      if (focusOnAdded) setFocus([addedNode.id]);
      return addedNode;
    },
    addEdge: (options) => {
      const addedEdge = actions.addEdge(options);
      const focusOnAdded = options?.focus ?? true;
      if (focusOnAdded) setFocus([addedEdge.id]);
      return addedEdge;
    },
    addElements: (options, shared) => {
      const updatedElements = actions.addElements(options, shared);
      const focusOnAdded = shared?.focus ?? true;
      if (focusOnAdded) {
        setFocus([
          ...updatedElements.addedNodes.map((n) => n.id),
          ...updatedElements.addedEdges.map((e) => e.id),
        ]);
      }
      return updatedElements;
    },
  };

  return {
    events,
    actions: extendedActions,
    controls: {
      focus: {
        activate,
        deactivate,
        set: setFocus,
        clear: clearFocus,
        add: addToFocus,
        all: focusAll,
        isFocused,
        focusedItemIds: readonly(focusedElementIds),
        focusedNodes: computed(() =>
          graph.nodes.value.filter((node) => isFocused(node.id)),
        ),
        focusedEdges: computed(() =>
          graph.edges.value.filter((edge) => isFocused(edge.id)),
        ),
      },
    },
  };
};
