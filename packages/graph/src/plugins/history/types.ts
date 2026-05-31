import { ComputedRef, Ref } from 'vue';

import { BaseTransactionWrapperOptions } from '../../base/actions/types.ts';
import { BaseGraphEventMap } from '../../base/events.ts';
import { BaseGraph } from '../../base/types.ts';
import { HistoryGraphEventMap } from './events.ts';

type HistoryOption = {
  /** Whether to add element(s) to history stack */
  history?: boolean;
};

type HistoryTransactionWrapperOptions = {
  [K in keyof BaseTransactionWrapperOptions]: HistoryOption;
};

export type GraphWithHistory<
  TransactionWrapperOptions,
  GraphEventMap extends BaseGraphEventMap,
  Plugins,
> = BaseGraph<
  HistoryTransactionWrapperOptions & TransactionWrapperOptions,
  HistoryGraphEventMap & GraphEventMap,
  Plugins & {
    /**
     * history plugin controls
     */
    history: HistoryGraph;
  }
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
