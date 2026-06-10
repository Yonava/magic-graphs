import { ComputedRef, Ref } from 'vue';

import { CoreTransactionWrapperOptions } from '../../core/actions/types.ts';
import { CoreEventMap } from '../../core/events.ts';
import { CoreGraph } from '../../core/types.ts';
import { HistoryEventMap } from './events.ts';

type HistoryOption = {
  /** Whether to add element(s) to history stack */
  history?: boolean;
};

export type HistoryTransactionWrapperOptions = {
  [K in keyof CoreTransactionWrapperOptions]: HistoryOption;
};

export type HistoryPlugin = {
  /**
   * history plugin controls
   */
  history: HistoryGraph;
};

export type GraphWithHistory<
  TransactionWrapperOptions,
  EventMap extends CoreEventMap,
  Plugins,
> = CoreGraph<
  TransactionWrapperOptions & HistoryTransactionWrapperOptions,
  EventMap & HistoryEventMap,
  Plugins & HistoryPlugin
>;

export type HistoryGraph = {
  /**
   * undoes the last action and moves it to the redo stack
   */
  undo: () => void;
  /**
   * redoes the last undone action and moves it to the undo stack
   */
  redo: () => void;
  /**
   * true if there are actions to undo
   */
  canUndo: ComputedRef<boolean>;
  /**
   * true if there are actions to redo
   */
  canRedo: ComputedRef<boolean>;
  /**
   * stores past actions to revert
   */
  undoStack: Ref<any[]>;
  /**
   * stores undone actions to reapply
   */
  redoStack: Ref<any[]>;
  /**
   * clears the undo and redo stacks
   */
  clearHistory: () => void;
};
