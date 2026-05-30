import { getCtx } from '@magic/utils/ctx/index';
import { MOUSE_BUTTONS } from '@magic/utils/mouse';
import { DeepReadonly } from 'ts-essentials';

import { computed, readonly, ref } from 'vue';

import {
  BaseTransactionWrapperOptions,
  ElementRemovalPayload,
} from '../../base/actions/types.ts';
import { BaseGraphEventMap } from '../../base/events.ts';
import type { BaseGraph, GraphMouseEvent } from '../../base/types.ts';
import { EventHub, createEventHub } from '../../events/createEventHub.ts';
import { mergeEventHubs } from '../../events/mergeEventHubs.ts';
import { useTheme } from '../../themes/useTheme.ts';
import type { GEdge, GNode, SchemaItem } from '../../types.ts';
import { FOCUS_THEME_ID } from './constants.ts';
import { FocusGraphEventMap, createFocusGraphEventBus } from './events.ts';
import {
  EdgeBaseThemePath,
  EdgeBaseToNodeFocusTheme,
  FocusGraphControls,
  FocusOption,
  NodeBaseThemePath,
  NodeBaseToNodeFocusTheme,
} from './types.ts';

type FocusTransactionWrapperOptions = {
  addNode: FocusOption;
};

type GraphWithFocus<
  TransactionWrapperOptions extends BaseTransactionWrapperOptions,
  GraphEventMap extends BaseGraphEventMap,
> = BaseGraph<
  FocusTransactionWrapperOptions & TransactionWrapperOptions,
  FocusGraphEventMap & GraphEventMap
> & {
  focus: FocusGraphControls;
};

export const useFocusPlugin = <
  TransactionWrapperOptions extends BaseTransactionWrapperOptions,
  GraphEventMap extends BaseGraphEventMap,
>(
  graph: BaseGraph,
): GraphWithFocus<TransactionWrapperOptions, GraphEventMap> => {
  const focusBus = createFocusGraphEventBus();
  const focusHub: EventHub<FocusGraphEventMap> = createEventHub(focusBus);
  const events = mergeEventHubs(focusHub, graph.events);

  const { setTheme } = useTheme(graph, FOCUS_THEME_ID);
  const focusedElementIds = ref(new Set<string>());

  const setFocus = (ids: string[]) => {
    const elementsAlreadyFocused = ids.every((id) =>
      focusedElementIds.value.has(id),
    );
    if (elementsAlreadyFocused) return;

    const oldIds = new Set(focusedElementIds.value);
    focusedElementIds.value = new Set(ids);

    events.emit('onFocusChange', focusedElementIds.value, oldIds);
  };

  const clearFocus = () => setFocus([]);

  const addToFocus = (id: string) => {
    const isInFocusAlready = focusedElementIds.value.has(id);
    if (isInFocusAlready) return;

    const oldIds = new Set([...focusedElementIds.value]);
    focusedElementIds.value.add(id);
    events.emit('onFocusChange', focusedElementIds.value, oldIds);
  };

  const handleTextArea = (schemaItem: SchemaItem) => {
    const ctx = getCtx(graph.magicCanvas.canvas);

    schemaItem.shape.startTextAreaEdit?.(ctx, (textAreaContent) => {
      const edge = graph.getEdge(schemaItem.id);
      if (!edge) throw new Error('textarea only implemented for edges');

      const newWeight = graph.settings.value.edgeInputToWeight(textAreaContent);
      if (
        newWeight === undefined ||
        edge.weight.valueOf() === newWeight.valueOf()
      ) {
        return;
      }

      graph.actions.updateEdge({
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

  const handleMouseDown = ({ items, coords, event }: GraphMouseEvent) => {
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
  };

  const focusAll = () => {
    const nodeIds = graph.nodes.value.map((node) => node.id);
    const edgeIds = graph.edges.value.map((edge) => edge.id);
    setFocus([...nodeIds, ...edgeIds]);
  };

  const isFocused = (id: string) => focusedElementIds.value.has(id);

  const nodeBaseStylePathMapping: NodeBaseToNodeFocusTheme = {
    'node.base.color': 'node.focus.color',
    'node.base.borderColor': 'node.focus.borderColor',
    'node.base.borderWidth': 'node.focus.borderWidth',
    'node.base.size': 'node.focus.size',
    'node.base.shape': 'node.focus.shape',
    'node.base.textColor': 'node.focus.textColor',
    'node.base.textSize': 'node.focus.textSize',
    'node.base.textFontWeight': 'node.focus.textFontWeight',
    'node.base.text': 'node.focus.text',
  };

  const edgeBaseStylePathMapping: EdgeBaseToNodeFocusTheme = {
    'edge.base.color': 'edge.focus.color',
    'edge.base.width': 'edge.focus.width',
    'edge.base.shape': 'edge.focus.shape',
    'edge.base.textColor': 'edge.focus.textColor',
    'edge.base.textSize': 'edge.focus.textSize',
    'edge.base.textFontWeight': 'edge.focus.textFontWeight',
    'edge.base.text': 'edge.focus.text',
  };

  const nodeEntries = Object.entries(nodeBaseStylePathMapping);
  const edgeEntries = Object.entries(edgeBaseStylePathMapping);

  for (const [nodeBasePath, nodeFocusPath] of nodeEntries) {
    setTheme(nodeBasePath as NodeBaseThemePath, (node: GNode) => {
      if (!isFocused(node.id)) return;
      // typescript generics to differentiate each callbacks individual
      // return type is juice not worth the squeeze
      return graph.getTheme(nodeFocusPath, node, graph) as any;
    });
  }

  for (const [edgeBasePath, edgeFocusPath] of edgeEntries) {
    setTheme(edgeBasePath as EdgeBaseThemePath, (edge: GEdge) => {
      if (!isFocused(edge.id)) return;
      // typescript generics to differentiate each callbacks individual
      // return type is juice not worth the squeeze
      return graph.getTheme(edgeFocusPath, edge, graph) as any;
    });
  }

  const activate = () => {
    events.subscribe('onMouseDown', handleMouseDown);
    events.subscribe('onElementsRemoved', clearRemovedElementsFromFocus);
  };

  const deactivate = () => {
    events.unsubscribe('onMouseDown', handleMouseDown);
    events.unsubscribe('onElementsRemoved', clearRemovedElementsFromFocus);
    clearFocus();
  };

  activate();

  return {
    ...{
      ...graph,
      // TODO ensure tests are added to guarantee the correct event systems are being propagated!
      events,
    },
    focus: {
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
  };
};

export const useFocus = (graph: BaseGraph) => {
  return {};
};
