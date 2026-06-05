import { EventMapToEventRegistry } from '../../events/index.ts';

export type FocusEventMap = {
  /**
   * when the set of focused items changes
   */
  onFocusChange: (
    newItemIds: ReadonlySet<string>,
    oldItemIds: ReadonlySet<string>,
  ) => void;
};

type FocusEventRegistry = EventMapToEventRegistry<FocusEventMap>;

export const createFocusEventRegistry = (): FocusEventRegistry => ({
  onFocusChange: new Set(),
});
