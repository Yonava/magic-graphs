import { EventMapToEventBus } from '../../events/index.ts';

export type HistoryGraphEventMap = {
  /**
   * when the undo action is triggered
   */
  onUndo: (historyRecord: any) => void;
  /**
   * when the redo action is triggered
   */
  onRedo: (historyRecord: any) => void;
};

type HistoryGraphEventBus = EventMapToEventBus<HistoryGraphEventMap>;

export const createHistoryGraphEventBus = (): HistoryGraphEventBus => ({
  onUndo: new Set(),
  onRedo: new Set(),
});
