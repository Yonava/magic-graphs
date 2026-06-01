import { BaseEventMap } from '../../base/events.ts';
import { BaseGraph } from '../../base/types.ts';

export type Serializable<T> = {
  [K in keyof T]: string;
};

type LocalStorageGraph = {
  /**
   * force-saves the current graph nodes and edges to localStorage.
   *
   * ℹ️ **note:** this happens automatically on {@link BaseEventMap.onTransactionComplete | `onTransactionComplete`} if enabled.
   */
  save: () => void;
};

export type LocalStoragePlugin = {
  /**
   * local storage plugin controls
   */
  localStorage: LocalStorageGraph;
};

export type GraphWithLocalStorage<
  TransactionWrapperOptions,
  EventMap extends BaseEventMap,
  Plugins,
> = BaseGraph<
  TransactionWrapperOptions,
  EventMap,
  Plugins & LocalStoragePlugin
>;
