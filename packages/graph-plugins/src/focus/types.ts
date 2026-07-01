import {
  GraphPlugin,
  WithLifecycle,
  WithTheme,
} from '@magic/graph-plugins-shared/plugins';
import { CoreEdge, CoreNode } from '@magic/graph-primitives/types';

import { ComputedRef, Ref } from 'vue';

import { CanvasPlugin } from '../canvas/types.ts';
import { FocusEventMap } from './events.ts';
import { FocusThemes } from './themes.ts';

type BaseFocusControls = {
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

export type FocusControls = WithTheme<BaseFocusControls, FocusThemes>;

export type FocusPlugin = GraphPlugin<{
  name: 'focus';
  controls: WithLifecycle<FocusControls>;
  events: FocusEventMap;
  actions: FocusActions;
  dependsOn: [CanvasPlugin];
}>;
