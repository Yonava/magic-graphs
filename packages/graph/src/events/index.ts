import { AnyFunction } from 'ts-essentials';

export type GenericEventMap = Record<string, AnyFunction>;

export type EventMapToEventBus<EventMap extends GenericEventMap> = {
  [EventName in keyof EventMap]: Set<EventMap[EventName]>;
};
