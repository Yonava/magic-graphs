import type { RemoveAnyArray } from '@utils/types';

/**
 * taking some data that may be a plain value or a function that returns that value
 *
 * @template T - the type of the value
 * @template K - the type of the arguments necessary in order to resolve the value
 */
export type MaybeGetter<T, K extends any[] = []> = T | ((...arg: K) => T);

/**
 * the value of a MaybeGetter
 */
export type UnwrapMaybeGetter<T> =
  T extends MaybeGetter<infer U, infer _> ? U : T;

/**
 * the parameters of a MaybeGetter
 */
export type MaybeGetterParams<T> = RemoveAnyArray<
  T extends MaybeGetter<infer _, infer K> ? K : []
>;

/**
 * unwraps a MaybeGetter into a value of type T.
 *
 * @param value - the value to unwrap
 * @param args - the arguments to pass to the getter if the value is a getter
 * @returns T, which is UnwrapMaybeGetter<MaybeGetter<T, K>>
 * @example getValue(5) // 5
 * getValue(() => 5) // 5
 */
export const getValue = <T, K extends any[]>(
  value: MaybeGetter<T, K>,
  ...args: K
) => {
  if (typeof value === 'function') {
    return (value as (...args: K) => T)(...args);
  }
  return value;
};
