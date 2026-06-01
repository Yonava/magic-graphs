import { EventMapToEventBus } from '../../events/index.ts';

export type FocusEventMap = {
  /**
   * when the set of focused items changes
   */
  onFocusChange: (
    newItemIds: ReadonlySet<string>,
    oldItemIds: ReadonlySet<string>,
  ) => void;
};

type FocusEventBus = EventMapToEventBus<FocusEventMap>;

export const createFocusEventBus = (): FocusEventBus => ({
  onFocusChange: new Set(),
});
