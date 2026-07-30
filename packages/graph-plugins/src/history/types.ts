import {
  GraphPlugin,
  WithEvents,
  WithLifecycle,
} from '@graph/plugins-shared/plugins';

import { HistoryEventMap } from './events.ts';

type BaseHistoryControls = {
  /**
   * records the current state of the whole graph as a history entry.
   *
   * meant to be called by whoever owns the mutation, once it settles. only that
   * plugin knows where a meaningful boundary is (nodeDrag on drop, not on every frame
   * of the drag), so history does not try to detect boundaries itself. a side effect
   * worth knowing: mutations made by product code stay out of history unless
   * something asks for them, which is the opt out you would otherwise need a flag for.
   *
   * cheap to over-call. every call within the same tick collapses into one record,
   * and a state identical to the current one is discarded.
   */
  captureSnapshot: () => void;
  /**
   * restores the state preceding the current one. a no-op while the plugin is disabled
   */
  undo: () => void;
  /**
   * restores the state that was undone. a no-op while the plugin is disabled
   */
  redo: () => void;
  /**
   * true if there is an earlier state to restore. false while the plugin is disabled
   */
  canUndo: () => boolean;
  /**
   * true if there is an undone state to restore. false while the plugin is disabled
   */
  canRedo: () => boolean;
  /**
   * drops every record, keeping the current state as the new starting point
   */
  clear: () => void;
  /**
   * number of records held, including the starting point
   */
  recordCount: () => number;
};

export type HistoryControls = WithLifecycle<
  WithEvents<BaseHistoryControls, HistoryEventMap>
>;

export type HistoryPlugin = GraphPlugin<{
  name: 'history';
  controls: HistoryControls;
  events: HistoryEventMap;
}>;
