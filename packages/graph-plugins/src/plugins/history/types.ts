import { GraphPlugin } from '@magic/graph/plugins/types';

import { ComputedRef, Ref } from 'vue';

import { HistoryEventMap } from './events.ts';

type HistoryOption = {
  /** Whether to add element(s) to history stack */
  history?: boolean;
};

type HistoryActions = {
  addNode: HistoryOption;
};

type HistoryControls = {
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

export type HistoryPlugin = GraphPlugin<{
  controls: { history: HistoryControls };
  events: HistoryEventMap;
  actions: HistoryActions;
}>;
