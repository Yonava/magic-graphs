import { EventMapToEventBus } from '../../events/index.ts';

export type HistoryEventMap = {
  /**
   * when the undo action is triggered
   */
  onUndo: (historyRecord: string) => void;
  /**
   * when the redo action is triggered
   */
  onRedo: (historyRecord: string) => void;
};

type HistoryEventBus = EventMapToEventBus<HistoryEventMap>;

export const createHistoryEventBus = (): HistoryEventBus => ({
  onUndo: new Set(),
  onRedo: new Set(),
});
