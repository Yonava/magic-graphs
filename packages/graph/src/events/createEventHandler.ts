import { AnyFunction } from 'ts-essentials';

import { GenericEventMap } from './types.ts';
import { getSortedByPriority } from './getSortedByPriority.ts';

export type HandlerPriority = {
  /** all registered handlers that we you want to yield to */
  before: string[];
};

type WithConsume<Callback extends AnyFunction> = (
  ...args: [...Parameters<Callback>, consume: () => void]
) => ReturnType<Callback>;

type HandlerData<Callback extends AnyFunction> = {
  id: string | undefined;
  priority: HandlerPriority;
  callback: WithConsume<Callback>;
};

type HandlerRecord<EventMap extends GenericEventMap> = {
  [EventName in keyof EventMap]?: HandlerData<EventMap[EventName]>[];
};


export const createEventHandler = <EventMap extends GenericEventMap>(
  eventHubId?: string,
) => {
  const allHandlers: HandlerRecord<EventMap> = {};
  return {
    handle: <EventName extends keyof EventMap>(
      eventName: EventName,
      eventCallback: WithConsume<EventMap[EventName]>,
      priority: HandlerPriority = { before: [] },
      handlerId?: string,
    ) => {
      const id = handlerId && eventHubId
        ? `${eventHubId}:${handlerId}`
        : eventHubId ?? handlerId;

      const handlers = allHandlers[eventName] ?? [];

      // TODO check for duplicate handler registrations

      allHandlers[eventName] = getSortedByPriority([
        ...handlers,
        { id, callback: eventCallback, priority },
      ]);
    },
    unhandle: <EventName extends keyof EventMap>(
      eventName: EventName,
      eventCallback: WithConsume<EventMap[EventName]>,
    ) => {
      const handlers = allHandlers[eventName];
      if (!handlers) return;
      allHandlers[eventName] = handlers.filter(
        ({ callback }) => callback !== eventCallback,
      );
    },
    fireHandlers: <EventName extends keyof EventMap>(
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
