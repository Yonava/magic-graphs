import { describe, expect, it, vi } from 'vitest';

import { EventHub } from './createEventHub.ts';
import { mergeEventHubs } from './mergeEventHubs.ts';

// A minimal, real working implementation of an EventHub for testing purposes
const createTestHub = <T extends Record<string, any>>(
  keys: Array<keyof T>,
): EventHub<T> => {
  const subscribers = new Map<keyof T, Set<Function>>();

  return {
    keys: new Set(keys),
    subscribe: (eventName, cb) => {
      if (!subscribers.has(eventName)) {
        subscribers.set(eventName, new Set());
      }
      subscribers.get(eventName)!.add(cb);
    },
    unsubscribe: (eventName, cb) => {
      subscribers.get(eventName)?.delete(cb);
    },
    emit: (eventName, ...args) => {
      subscribers.get(eventName)?.forEach((cb) => cb(...args));
    },
  };
};

describe('mergeEventHubs - Deep Merge', () => {
  it('should only call subscribers once when deeply merged', () => {
    const hub1 = createTestHub<{ a: () => void }>(['a']);
    const hub2 = createTestHub<{ b: () => void }>(['b']);
    const hub3 = createTestHub<{ c: () => void }>(['c']);

    const merged1 = mergeEventHubs(hub1, hub2);
    const merged2 = mergeEventHubs(merged1, hub3);

    const cb = vi.fn();

    merged2.subscribe('c', cb);
    merged2.emit('c');

    expect(cb).toHaveBeenCalledOnce();
  });

  it('should call subscribers on overlapping keys across hubs without duplication', () => {
    const hub1 = createTestHub<{ shared: () => void }>(['shared']);
    const hub2 = createTestHub<{ shared: () => void }>(['shared']);
    const merged = mergeEventHubs(hub1, hub2);

    const cb = vi.fn();
    merged.subscribe('shared', cb);

    // This will trigger hub1 and hub2, but since they share the same 'cb' instance,
    // we want to invoke BOTH subscribers.
    merged.emit('shared');
    expect(cb).toHaveBeenCalledTimes(2);
  });
});
