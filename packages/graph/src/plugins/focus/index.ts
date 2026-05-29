import { getCtx } from '@magic/utils/ctx/index';
import { MOUSE_BUTTONS } from '@magic/utils/mouse';

import { computed, readonly, ref } from 'vue';

import type { BaseGraph } from '../../base/index.ts';
import type { FocusOption, GraphMouseEvent } from '../../base/types.ts';
import { ValidGraphThemePath } from '../../themes/types.ts';
import { useTheme } from '../../themes/useTheme.ts';
import type { GEdge, GNode, SchemaItem } from '../../types.ts';
import { FOCUSABLE_GRAPH_TYPES, FOCUS_THEME_ID } from './constants.ts';

type NodeBaseThemePath = Extract<ValidGraphThemePath, `node.base.${string}`>;
type EdgeBaseThemePath = Extract<ValidGraphThemePath, `edge.base.${string}`>;

type NodeBaseToNodeFocusTheme = {
  [Path in NodeBaseThemePath]: Path extends `node.base.${infer Style}`
    ? `node.focus.${Style}`
    : never;
};
type EdgeBaseToNodeFocusTheme = {
  [Path in EdgeBaseThemePath]: Path extends `edge.base.${infer Style}`
    ? `edge.focus.${Style}`
    : never;
};

export const useFocus = (graph: BaseGraph) => {
  const { setTheme } = useTheme(graph, FOCUS_THEME_ID);
  const focusedItemIds = ref(new Set<string>());

  const setFocus = (ids: string[]) => {
    const nonBlacklistedIds = ids.filter(
      (id) => !graph.settings.value.focusBlacklist.includes(id),
    );
    const sameLength = nonBlacklistedIds.length === focusedItemIds.value.size;

    const sameIds =
      sameLength &&
      nonBlacklistedIds.every((id) => focusedItemIds.value.has(id));
    if (sameIds) return;

    const oldIds = new Set([...focusedItemIds.value]);
    focusedItemIds.value = new Set(nonBlacklistedIds);

    graph.emit('onFocusChange', focusedItemIds.value, oldIds);
  };

  const addToFocus = (id: string) => {
    const isInFocusAlready = focusedItemIds.value.has(id);
    if (isInFocusAlready) return;

    const isOnBlacklist = graph.settings.value.focusBlacklist.includes(id);
    if (isOnBlacklist) return;

    const oldIds = new Set([...focusedItemIds.value]);
    focusedItemIds.value.add(id);
    graph.emit('onFocusChange', focusedItemIds.value, oldIds);
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

  const clearOutDeletedItemsFromFocus = () => {
    const focusedIds = Array.from(focusedItemIds.value);
    const newFocusedIds = focusedIds.filter(
      (id) => graph.getNode(id) || graph.getEdge(id),
    );
    if (newFocusedIds.length === focusedIds.length) return;
    setFocus(newFocusedIds);
  };

  const handleFocusChange = ({ items, coords, event }: GraphMouseEvent) => {
    if (event.button !== MOUSE_BUTTONS.left) return;
    const topItem = items.at(-1);
    if (!topItem) {
      return event.shiftKey ? undefined : resetFocus();
    }

    // handle text areas
    const inATextArea = topItem.shape.textHitbox?.(coords);
    const canEdit =
      inATextArea &&
      graph.settings.value.edgeLabelsEditable &&
      topItem.graphType === 'edge';

    if (canEdit) {
      resetFocus();
      return handleTextArea(topItem);
    }

    const canFocus = FOCUSABLE_GRAPH_TYPES.some(
      (type) => type === topItem.graphType,
    );
    if (!canFocus) return;

    if (event.shiftKey) addToFocus(topItem.id);
    else setFocus([topItem.id]);
  };

  const resetFocus = () => setFocus([]);

  const focusAll = () => {
    const nodeIds = graph.nodes.value.map((node) => node.id);
    const edgeIds = graph.edges.value.map((edge) => edge.id);
    setFocus([...nodeIds, ...edgeIds]);
  };

  const setFocusToAddedItem = (
    { id }: { id: string },
    { focus }: FocusOption,
  ) => {
    if (focus) setFocus([id]);
  };

  const isFocused = (id: string) => focusedItemIds.value.has(id);

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
    graph.subscribe('onNodeAdded', setFocusToAddedItem);
    graph.subscribe('onEdgeAdded', setFocusToAddedItem);
    graph.subscribe('onMouseDown', handleFocusChange);
    graph.subscribe('onStructureChange', clearOutDeletedItemsFromFocus);
    graph.subscribe('onGraphReset', resetFocus);
  };

  const deactivate = () => {
    graph.unsubscribe('onNodeAdded', setFocusToAddedItem);
    graph.unsubscribe('onEdgeAdded', setFocusToAddedItem);
    graph.unsubscribe('onMouseDown', handleFocusChange);
    graph.unsubscribe('onStructureChange', clearOutDeletedItemsFromFocus);
    graph.unsubscribe('onGraphReset', resetFocus);
    resetFocus();
  };

  const { hold, release } = graph.pluginHoldController('focus');

  graph.subscribe('onSettingsChange', (diff) => {
    if (diff.focusable === false) {
      deactivate();
      hold('marquee');
    } else if (diff.focusable === true) {
      activate();
      release('marquee');
    }
  });

  if (graph.settings.value.focusable) activate();

  return {
    /**
     * Sets the focus to the item with the given ids
     *
     * @param ids the ids of the items to focus
     */
    set: setFocus,
    /**
     * Resets the focus back to none
     */
    reset: resetFocus,
    /**
     * Adds an item to the current focus
     *
     * @param id the id of the item to add to the focus
     */
    add: addToFocus,
    /**
     * Focus all nodes and edges
     */
    all: focusAll,
    /**
     * asks if the item with the given id is focused
     *
     * @param id the id of the item to check
     * @returns true if the item is focused
     */
    isFocused,
    /**
     * The ids of the focused item in the graph
     */
    focusedItemIds: readonly(focusedItemIds),
    /**
     * all the nodes that are focused
     */
    focusedNodes: computed(() =>
      graph.nodes.value.filter((node) => isFocused(node.id)),
    ),
    /**
     * all the edges that are focused
     */
    focusedEdges: computed(() =>
      graph.edges.value.filter((edge) => isFocused(edge.id)),
    ),
  };
};

export type GraphFocusControls = ReturnType<typeof useFocus>;
export type GraphFocusPlugin = {
  /**
   * controls for focusing items in the graph
   */
  focus: GraphFocusControls;
};
