import { ComputedRef, Ref } from 'vue';

import { CoreEventMap } from '../../core/events.ts';
import { CoreGraph } from '../../core/types.ts';
import { ValidGraphThemePath } from '../../themes/types.ts';
import { GEdge, GNode, GraphPlugin } from '../../types.ts';
import { CanvasEventMap } from '../canvas/events.ts';
import { CanvasPlugin } from '../canvas/types.ts';
import { FocusEventMap } from './events.ts';

export type FocusGraph = {
  /**
   * Sets the focus to the element with the given ids
   *
   * @param ids the ids of the elements to focus
   */
  set: (ids: string[]) => void;
  /**
   * Removes all elements from focus
   */
  clear: () => void;
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
  focusedItemIds: Readonly<Ref<ReadonlySet<string>>>;
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
   * @default true
   */
  focus: boolean;
};

export type NodeBaseThemePath = Extract<
  ValidGraphThemePath,
  `node.default.${string}`
>;
export type EdgeBaseThemePath = Extract<
  ValidGraphThemePath,
  `edge.default.${string}`
>;

export type NodeBaseToNodeFocusTheme = {
  [Path in NodeBaseThemePath]: Path extends `node.default.${infer Style}`
    ? `node.focus.${Style}`
    : never;
};
export type EdgeBaseToNodeFocusTheme = {
  [Path in EdgeBaseThemePath]: Path extends `edge.default.${infer Style}`
    ? `edge.focus.${Style}`
    : never;
};

export type FocusTransactionWrapperOptions = {
  addNode: FocusOption;
  addEdge: FocusOption;
  addElements: FocusOption;
};

export type FocusPlugin = {
  /**
   * graph focus plugin controls
   */
  focus: GraphPlugin<FocusGraph>;
};

export type GraphWithFocus<
  TransactionWrapperOptions,
  EventMap extends CoreEventMap,
  Plugins,
> = CoreGraph<
  TransactionWrapperOptions & FocusTransactionWrapperOptions,
  EventMap & CanvasEventMap & FocusEventMap,
  Plugins & CanvasPlugin & FocusPlugin
>;
