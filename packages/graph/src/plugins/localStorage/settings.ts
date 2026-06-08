import { GEdge, GNode } from '../../types.ts';

export type LocalStorageGraphSettings = {
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
  localStorageKey: 'graph',
  localStorageBlacklist: new Set(),
};
