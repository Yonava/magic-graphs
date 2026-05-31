import { GEdge, GNode } from '../../types.ts';

export type LocalStorageGraphSettings = {
  /**
   * whether the nodes and edges of the graph will be saved in {@link localStorage | local storage}
   * @default true
   */
  localStorage: boolean;
  /**
   * the key used for saving the graph in {@link localStorage | local storage}
   * @default "graph"
   */
  localStorageKey: string;
  /**
   * set of node or edge ids that will not be saved to localStorage
   * @default new Set()
   */
  localStorageBlacklist: Set<GNode['id'] | GEdge['id']>;
};

export const DEFAULT_LOCAL_STORAGE_SETTINGS: LocalStorageGraphSettings = {
  localStorage: true,
  localStorageKey: 'graph',
  localStorageBlacklist: new Set(),
};
