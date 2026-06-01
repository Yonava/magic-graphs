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

type FocusEventBus = EventMapToEventBus<FocusGraphEventMap>;

export const createFocusEventBus = (): FocusEventBus => ({
  onFocusChange: new Set(),
});
