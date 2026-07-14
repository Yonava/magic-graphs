import type { Prettify } from 'ts-essentials';

/**
 * makes only certain keys K in an object T optional
 * @example
 * type T = PartiallyPartial<{ a: number, b: string }, 'a'> // { a?: number, b: string }
 */
export type PartiallyPartial<T, K extends keyof T> = Prettify<
  Omit<T, K> & Partial<Pick<T, K>>
>;

/**
 * makes only certain keys K in an object T required
 * @example
 * type T = PartiallyRequired<{ a?: number, b?: string }, 'a'> // { a: number, b?: string }
 */
export type PartiallyRequired<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;

/**
 * takes `any[]` out of a union of arrays
 * @example RemoveAnyArray<number[] | any[]> // number[]
 */
export type RemoveAnyArray<T extends unknown[]> = Exclude<
  T,
  ['!!!-@-NOT-A-TYPE-@-!!!'][]
>;

// HTML mouse and keyboard event types

type HTMLElementEventName = keyof HTMLElementEventMap;

type FilterEventName<EventType> = {
  [
    EventName in HTMLElementEventName
  ]: HTMLElementEventMap[EventName] extends EventType ? EventName : never;
}[HTMLElementEventName];

type MouseEventName = FilterEventName<MouseEvent>;
type KeyboardEventName = FilterEventName<KeyboardEvent>;

type EventMap<EventName extends HTMLElementEventName, EventArgs> = Record<
  EventName,
  (ev: EventArgs) => void
>;

export type MouseEventMap = EventMap<MouseEventName, MouseEvent>;
export type KeyboardEventMap = EventMap<KeyboardEventName, KeyboardEvent>;

export type MouseEventEntries = [
  keyof MouseEventMap,
  (ev: MouseEvent) => void,
][];
export type KeyboardEventEntries = [
  keyof KeyboardEventMap,
  (ev: KeyboardEvent) => void,
][];
