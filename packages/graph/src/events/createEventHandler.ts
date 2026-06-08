import type { AnyFunction } from 'ts-essentials';

import { CORE_EVENT_ID } from '../base/index.ts';
import { ANCHOR_EVENT_ID } from '../plugins/anchors/index.ts';
import { CANVAS_EVENT_ID } from '../plugins/canvas/index.ts';
import { DRAG_EVENT_ID } from '../plugins/drag/index.ts';
import { FOCUS_EVENT_ID } from '../plugins/focus/index.ts';
import { HISTORY_EVENT_ID } from '../plugins/history/index.ts';
import { MARQUEE_EVENT_ID } from '../plugins/marquee/index.ts';
import { getSortedByPriority } from './getSortedByPriority.ts';
import { GenericEventMap } from './types.ts';

export type HandlerPriority = {
  /** all registered handlers that we you want to yield to */
  before: readonly HandlerId[];
};

export type HandlerId =
  | typeof CANVAS_EVENT_ID
  | typeof ANCHOR_EVENT_ID
  | typeof DRAG_EVENT_ID
  | typeof HISTORY_EVENT_ID
  | typeof MARQUEE_EVENT_ID
  | typeof FOCUS_EVENT_ID
  | typeof CORE_EVENT_ID
  // annotation add-on in @magic/products: @magic/graph can't import product deps and this
  // type is only temporary for type safety while building Magic Graphs experiences
  | 'product/annotation';

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

export const createEventHandler = <EventMap extends GenericEventMap>() => {
  const allHandlers: HandlerRecord<EventMap> = {};
  return {
    handle: <EventName extends keyof EventMap>(
      eventName: EventName,
      eventCallback: WithConsume<EventMap[EventName]>,
      handlerId: HandlerId,
      priority: HandlerPriority = { before: [] },
    ) => {
      const handlers = allHandlers[eventName] ?? [];

      // TODO check for duplicate handler registrations
      // https://github.com/Yonava/magic-graphs/issues/640

      allHandlers[eventName] = getSortedByPriority([
        ...handlers,
        { id: handlerId, callback: eventCallback, priority },
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
      const consume = () => {
        consumed = true;
      };
      for (const { callback } of handlers) {
        if (consumed) return;
        callback(...callbackArgs, consume);
      }
    },
  };
};
