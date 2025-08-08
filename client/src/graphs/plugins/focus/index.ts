import type { BaseGraph } from '@graph/base';
import type { FocusOption, GraphMouseEvent } from '@graph/base/types';
import { useTheme } from '@graph/themes/useTheme';
import type { SchemaItem } from '@graph/types';
import { getCtx } from '@utils/ctx';
import { MOUSE_BUTTONS } from '@utils/mouse';

import { computed, readonly, ref } from 'vue';

import { FOCUSABLE_GRAPH_TYPES, FOCUS_THEME_ID } from './constants';

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

      const newLabel = graph.settings.value.edgeInputToLabel(textAreaContent);
      if (newLabel === undefined || edge.label === newLabel) return;

      graph.editEdgeLabel(edge.id, newLabel);
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

  setTheme('nodeColor', (node) => {
    if (!isFocused(node.id)) return;
    return graph.getTheme('nodeFocusColor', node);
  });

  setTheme('nodeBorderColor', (node) => {
    if (!isFocused(node.id)) return;
    return graph.getTheme('nodeFocusBorderColor', node);
  });

  setTheme('nodeTextColor', (node) => {
    if (!isFocused(node.id)) return;
    return graph.getTheme('nodeFocusTextColor', node);
  });

  setTheme('edgeColor', (edge) => {
    if (!isFocused(edge.id)) return;
    return graph.getTheme('edgeFocusColor', edge);
  });

  setTheme('edgeTextColor', (edge) => {
    if (!isFocused(edge.id)) return;
    return graph.getTheme('edgeFocusTextColor', edge);
  });

  setTheme('nodeAnchorColor', (node) => {
    if (!isFocused(node.id)) return;
    return graph.getTheme('nodeAnchorColorWhenParentFocused', node);
  });

  const activate = () => {
    graph.subscribe('onNodeAdded', setFocusToAddedItem);
    graph.subscribe('onEdgeAdded', setFocusToAddedItem);
    graph.subscribe('onMouseDown', handleFocusChange);
    graph.subscribe('onStructureChange', clearOutDeletedItemsFromFocus);
  };

  const deactivate = () => {
    graph.unsubscribe('onNodeAdded', setFocusToAddedItem);
    graph.unsubscribe('onEdgeAdded', setFocusToAddedItem);
    graph.unsubscribe('onMouseDown', handleFocusChange);
    graph.unsubscribe('onStructureChange', clearOutDeletedItemsFromFocus);
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
