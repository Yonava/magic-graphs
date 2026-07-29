import {
  GraphPlugin,
  WithEvents,
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
  removeNode: HistoryOption;
};

export type HistoryRecord = {
  forward: () => void;
  inverse: () => void;
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
   * clear all history
   */
  clear: () => void;
};

export type HistoryPlugin = GraphPlugin<{
  name: 'history';
  controls: WithLifecycle<WithEvents<HistoryControls, HistoryEventMap>>;
  events: HistoryEventMap;
  actions: HistoryActions;
  dependsOn: [];
}>;
