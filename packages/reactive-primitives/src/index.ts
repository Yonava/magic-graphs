import {
  computed,
  effect,
  endBatch,
  setActiveSub,
  signal,
  startBatch,
} from 'alien-signals';

export { reactiveMap, reactiveSet } from './collections.ts';
export type { ReactiveMap, ReactiveSet } from './collections.ts';

/**
 * a readable and writable reactive value. call it with no arguments to read,
 * with one argument to write.
 */
export type Signal<T> = {
  (): T;
  (value: T): void;
};

/** a derived value. recomputes lazily on read, only once its sources change. */
export type Computed<T> = () => T;

export { computed, effect, signal };

/** reads inside `fn` are not recorded as dependencies of the surrounding scope. */
export const untracked = <T>(fn: () => T): T => {
  const previousSub = setActiveSub(undefined);
  try {
    return fn();
  } finally {
    setActiveSub(previousSub);
  }
};

/** notifies effects once for the writes in `fn`. computed reads are lazy either way. */
export const batch = <T>(fn: () => T): T => {
  startBatch();
  try {
    return fn();
  } finally {
    endBatch();
  }
};
