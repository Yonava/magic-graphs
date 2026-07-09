import {
  GraphPlugin,
  WithLifecycle,
} from '@graph/plugins-shared/plugins';
import { DeepReadonly } from 'ts-essentials';

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
  canUndo: () => boolean;
  /**
   * true if there are actions to redo
   */
  canRedo: () => boolean;
  /**
   * stores past actions to revert
   */
  undoStack: DeepReadonly<any[]>;
  /**
   * stores undone actions to reapply
   */
  redoStack: DeepReadonly<any[]>;
  /**
   * clears the undo and redo stacks
   */
  clearHistory: () => void;
};

export type HistoryPlugin = GraphPlugin<{
  name: 'history';
  controls: WithLifecycle<HistoryControls>;
  events: HistoryEventMap;
  actions: HistoryActions;
  dependsOn: [];
}>;
