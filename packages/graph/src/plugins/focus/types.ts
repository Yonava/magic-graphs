import { ComputedRef, Ref } from 'vue';

import { GraphEventMapToEventBus } from '../../events/index.ts';
import { ValidGraphThemePath } from '../../themes/types.ts';
import { GEdge, GNode } from '../../types.ts';

export type WithFocusSettings<T> = T & {
  /**
   * if false, no elements on the graph can be focused
   * @default true
   */
  focusable: boolean;
};

export type FocusGraphEventMap = {
  /**
   * when the set of focused items changes
   */
  onFocusChange: (
    newItemIds: Readonly<Set<string>>,
    oldItemIds: Readonly<Set<string>>,
  ) => void;
};

type FocusGraphEventBus = GraphEventMapToEventBus<FocusGraphEventMap>;

export const getInitialFocusEventBus = (): FocusGraphEventBus => ({
  onFocusChange: new Set(),
});

export type FocusGraphControls = {
  /**
   * Sets the focus to the element with the given ids
   *
   * @param ids the ids of the elements to focus
   */
  set: (ids: string[]) => void;
  /**
   * Removes all elements from focus
   */
  reset: () => void;
  /**
   * Adds an element to the current focus
   *
   * @param id the id of the element to add to the focus
   */
  add: (id: string) => void;
  /**
   * Focus all elements
   */
  all: () => void;
  /**
   * @param id the id of the element to check
   * @returns true if the element is focused
   */
  isFocused: (id: string) => boolean;
  /**
   * The ids of all focused elements
   */
  focusedItemIds: Readonly<Ref<string[]>>;
  /**
   * All the nodes that are focused
   */
  focusedNodes: ComputedRef<GNode[]>;
  /**
   * All the edges that are focused
   */
  focusedEdges: ComputedRef<GEdge[]>;
};

export type FocusOption = {
  /**
   * Whether to focus the added element(s).
   */
  focus: boolean;
};

export type NodeBaseThemePath = Extract<
  ValidGraphThemePath,
  `node.base.${string}`
>;
export type EdgeBaseThemePath = Extract<
  ValidGraphThemePath,
  `edge.base.${string}`
>;

export type NodeBaseToNodeFocusTheme = {
  [Path in NodeBaseThemePath]: Path extends `node.base.${infer Style}`
    ? `node.focus.${Style}`
    : never;
};
export type EdgeBaseToNodeFocusTheme = {
  [Path in EdgeBaseThemePath]: Path extends `edge.base.${infer Style}`
    ? `edge.focus.${Style}`
    : never;
};
