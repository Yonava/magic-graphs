import type { UnionToIntersection, Prettify } from "ts-essentials";

/**
 * makes only certain keys K in an object T optional
 * @example
 * type T = PartiallyPartial<{ a: number, b: string }, 'a'> // { a?: number, b: string }
 */
export type PartiallyPartial<T, K extends keyof T> = Prettify<
  Omit<T, K> &
  Partial<Pick<T, K>>
>;

/**
 * makes only certain keys K in an object T required
 * @example
 * type T = PartiallyRequired<{ a?: number, b?: string }, 'a'> // { a: number, b?: string }
 */
export type PartiallyRequired<T, K extends keyof T> = Prettify<
  Omit<T, K> &
  Required<Pick<T, K>>
>;

/**
 * takes `any[]` out of a union of arrays
 * @example RemoveAnyArray<number[] | any[]> // number[]
 */
export type RemoveAnyArray<T extends unknown[]> = Exclude<
  T,
  ['!!!-@-NOT-A-TYPE-@-!!!'][]
>;

// HTML mouse and keyboard event types

type EventNames = keyof HTMLElementEventMap;

type FilterEventNames<T> = {
  [K in EventNames]: HTMLElementEventMap[K] extends T ? K : never;
}[EventNames];

type MouseEventNames = FilterEventNames<MouseEvent>;
type KeyboardEventNames = FilterEventNames<KeyboardEvent>;

type EventMap<T extends EventNames, E> = Record<T, (ev: E) => void>;

export type MouseEventMap = EventMap<MouseEventNames, MouseEvent>;
export type KeyboardEventMap = EventMap<KeyboardEventNames, KeyboardEvent>;

export type MouseEventEntries = [
  keyof MouseEventMap,
  (ev: MouseEvent) => void,
][];
export type KeyboardEventEntries = [
  keyof KeyboardEventMap,
  (ev: KeyboardEvent) => void,
][];

export type TimeoutHandler = ReturnType<typeof setTimeout>;
export type IntervalHandler = ReturnType<typeof setInterval>;

type LastOf<U> =
  UnionToIntersection<U extends any ? () => U : never> extends () => infer R
  ? R
  : never;

type Push<T extends any[], V> = [...T, V];

type UnionToTuple<T, L = LastOf<T>> =
  [T] extends [never]
  ? []
  : Push<UnionToTuple<Exclude<T, L>>, L>;

/**
 * turns the keys of an object into a tuple
 *
 * WARNING: order is not guaranteed! for deterministic ordering use
 * readonly runtime array instead
 *
 * @example
 * ObjectKeysToTuple<{ name: string, age: number, id: string }>
 * // ["name", "age", "id"]
 */
export type ObjectKeysToTuple<T extends object> = UnionToTuple<keyof T>