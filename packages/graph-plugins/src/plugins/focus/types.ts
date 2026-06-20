import { GraphPlugin, WithLifecycle } from '@magic/graph/plugins/types';
import { CoreEdge, CoreNode } from '@magic/graph/types';

import { ComputedRef, Ref } from 'vue';

import { ThemeToken } from '../canvas/themes/types.ts';
import { CanvasPlugin } from '../canvas/types.ts';
import { FocusEventMap } from './events.ts';

export type NodeBaseThemePath = Extract<ThemeToken, `node.default.${string}`>;
export type EdgeBaseThemePath = Extract<ThemeToken, `edge.default.${string}`>;

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

export type FocusControls = {
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
  focusedElementIds: Readonly<Ref<ReadonlySet<string>>>;
  /**
   * All the nodes that are focused
   */
  focusedNodes: ComputedRef<CoreNode[]>;
  /**
   * All the edges that are focused
   */
  focusedEdges: ComputedRef<CoreEdge[]>;
};

export type FocusOption = {
  /**
   * Whether to focus the added element(s).
   * @default true
   */
  focus?: boolean;
};

export type FocusActions = {
  addNode: FocusOption;
  addEdge: FocusOption;
  addElements: {
    nodes: FocusOption;
    edges: FocusOption;
    shared: FocusOption;
  };
};

export type FocusPlugin = GraphPlugin<{
  controls: { focus: WithLifecycle<FocusControls> };
  events: FocusEventMap;
  actions: FocusActions;
  dependsOn: [CanvasPlugin];
}>;
