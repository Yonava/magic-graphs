import { EventMapToEventBus } from '../../events/index.ts';

export type FocusGraphEventMap = {
  /**
   * when the set of focused items changes
   */
  onFocusChange: (
    newItemIds: ReadonlySet<string>,
    oldItemIds: ReadonlySet<string>,
  ) => void;
};

type FocusGraphEventBus = EventMapToEventBus<FocusGraphEventMap>;

export const createFocusGraphEventBus = (): FocusGraphEventBus => ({
  onFocusChange: new Set(),
});
