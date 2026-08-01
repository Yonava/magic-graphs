import { effect } from '@reactive/primitives/index';

import { computed, onScopeDispose, shallowRef } from 'vue';

/**
 * bridges a signal or computed from `@reactive/primitives` into a vue ref.
 *
 * the only effect in the system. everything inside the SDK is pull based, and vue's
 * renderer is push based, so exactly one place has to convert between them. keeping it
 * to this file is what stops ordering hazards from spreading.
 *
 * note this forfeits laziness for whatever it bridges: the effect has to read `source`
 * to subscribe to it, which evaluates the derivation on every change whether or not a
 * template ever reads the result. unavoidable at the boundary, since knowing a value
 * changed means computing it.
 */
export const useSignal = <T>(source: () => T) => {
  const refresh = shallowRef(0);

  const stop = effect(() => {
    source();
    refresh.value++;
  });

  onScopeDispose(stop, true);

  return computed(() => {
    refresh.value;
    return source();
  });
};

/** `useSignal` across an object of signals, keeping the keys. */
export const useSignals = <Sources extends Record<string, () => unknown>>(
  sources: Sources,
) =>
  Object.fromEntries(
    Object.entries(sources).map(([key, source]) => [key, useSignal(source)]),
  ) as {
    [Key in keyof Sources]: ReturnType<
      typeof useSignal<ReturnType<Sources[Key]>>
    >;
  };
