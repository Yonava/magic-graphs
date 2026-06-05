import { GenericEventMap } from './index.ts';

export type HandlerPriority = {
  /** all registered handlers that we you want to yield to */
  before: string[];
};

type HandlerData<CallbackArgs extends unknown[]> = {
  priority: HandlerPriority;
  callback: (...args: [...CallbackArgs, consume: () => void]) => void;
};

type HandlerRecord<EventMap extends GenericEventMap> = {
  [EventName in keyof EventMap]?: HandlerData<
    Parameters<EventMap[EventName]>
  >[];
};

// TODO implement topological sort
const getArraySortedByPriority = <
  SortableItem extends { priority: HandlerPriority },
>(
  array: SortableItem[],
) => {
  return [...array];
};

export const createEventHandler = <EventMap extends GenericEventMap>() => {
  const allHandlers: HandlerRecord<EventMap> = {};
  return {
    register: <EventName extends keyof EventMap>(
      eventName: EventName,
      eventCallback: EventMap[EventName],
      priority: HandlerPriority = { before: [] },
    ) => {
      const handlers = allHandlers[eventName] ?? [];

      // TODO check for duplicate handler registrations

      allHandlers[eventName] = getArraySortedByPriority([
        ...handlers,
        { callback: eventCallback, priority },
      ]);
    },
    fire: <EventName extends keyof EventMap>(
      eventName: EventName,
      ...callbackArgs: Parameters<EventMap[EventName]>
    ) => {
      const handlers = allHandlers[eventName];
      if (!handlers) return;
      let consumed = false;
      const consume = () => (consumed = true);
      for (const { callback } of handlers) {
        if (consumed) return;
        callback(...callbackArgs, consume);
      }
    },
  };
};
