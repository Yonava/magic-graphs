import { describe, expect, it, vi } from 'vitest';

import { batch, computed, effect, signal, untracked } from './index.ts';

describe('signal and computed', () => {
  it('reads and writes through call style', () => {
    const count = signal(0);

    expect(count()).toBe(0);
    count(1);
    expect(count()).toBe(1);
  });

  it('recomputes a derived value only after its source changes', () => {
    const count = signal(1);
    const runs = vi.fn();
    const doubled = computed(() => {
      runs();
      return count() * 2;
    });

    expect(doubled()).toBe(2);
    expect(doubled()).toBe(2);
    expect(runs).toHaveBeenCalledTimes(1);

    count(2);
    expect(doubled()).toBe(4);
    expect(runs).toHaveBeenCalledTimes(2);
  });

  it('propagates through a chain without recomputing unrelated links', () => {
    const count = signal(1);
    const doubled = computed(() => count() * 2);
    const runs = vi.fn();
    const label = computed(() => {
      runs();
      return `value: ${doubled()}`;
    });

    expect(label()).toBe('value: 2');
    count(5);
    expect(label()).toBe('value: 10');
    expect(runs).toHaveBeenCalledTimes(2);
  });
});

describe('untracked', () => {
  it('reads without registering a dependency', () => {
    const tracked = signal(0);
    const ignored = signal(0);
    const runs = vi.fn();
    const derived = computed(() => {
      runs();
      return tracked() + untracked(() => ignored());
    });

    expect(derived()).toBe(0);

    ignored(10);
    expect(derived()).toBe(0);
    expect(runs).toHaveBeenCalledTimes(1);

    tracked(1);
    expect(derived()).toBe(11);
  });

  it('restores the surrounding tracking scope afterwards', () => {
    const before = signal(0);
    const after = signal(0);
    const ignored = signal(0);
    const derived = computed(
      () => before() + untracked(() => ignored()) + after(),
    );

    expect(derived()).toBe(0);
    after(3);
    expect(derived()).toBe(3);
  });
});

describe('batch', () => {
  it('notifies an effect once across several writes', () => {
    const first = signal(0);
    const second = signal(0);
    const runs = vi.fn();

    effect(() => {
      runs();
      first();
      second();
    });
    expect(runs).toHaveBeenCalledTimes(1);

    batch(() => {
      first(1);
      second(1);
    });

    expect(runs).toHaveBeenCalledTimes(2);
  });

  it('returns the callback result and ends the batch when it throws', () => {
    expect(batch(() => 'result')).toBe('result');

    const count = signal(0);
    const runs = vi.fn();
    effect(() => {
      runs();
      count();
    });

    expect(() =>
      batch(() => {
        count(1);
        throw new Error('boom');
      }),
    ).toThrow('boom');

    // a batch left open by the throw would swallow this notification
    count(2);
    expect(runs).toHaveBeenCalledTimes(3);
  });
});
