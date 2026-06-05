import { describe, expect, it, vi } from 'vitest';

import { createEventHub } from './createEventHub.ts';
import type { EventMapToEventRegistry } from './index.ts';

type MockEventMap = {
  onNodeAdded: (node: { id: string }) => void;
  onDraw: () => void;
  onCoordinatesChange: (x: number, y: number) => void;
};

const createMockEventRegistry = (): EventMapToEventRegistry<MockEventMap> => ({
  onNodeAdded: new Set(),
  onDraw: new Set(),
  onCoordinatesChange: new Set(),
});

describe(createEventHub, () => {
  it('successfully registers a callback via subscribe', () => {
    const registry = createMockEventRegistry();
    const hub = createEventHub<MockEventMap>(registry);
    const callback = vi.fn();

    hub.subscribe('onNodeAdded', callback);

    expect(registry.onNodeAdded.has(callback)).toBe(true);
    expect(registry.onNodeAdded.size).toBe(1);
  });

  it('safely unregisters a callback via unsubscribe', () => {
    const registry = createMockEventRegistry();
    const hub = createEventHub<MockEventMap>(registry);
    const callback = vi.fn();

    hub.subscribe('onNodeAdded', callback);
    expect(registry.onNodeAdded.size).toBe(1);

    hub.unsubscribe('onNodeAdded', callback);

    expect(registry.onNodeAdded.has(callback)).toBe(false);
    expect(registry.onNodeAdded.size).toBe(0);
  });

  it('broadcasts to all subscribers with exact parameters when emit is invoked', () => {
    const registry = createMockEventRegistry();
    const hub = createEventHub<MockEventMap>(registry);

    const subscriberA = vi.fn();
    const subscriberB = vi.fn();

    hub.subscribe('onCoordinatesChange', subscriberA);
    hub.subscribe('onCoordinatesChange', subscriberB);

    hub.emit('onCoordinatesChange', 100, 250);

    expect(subscriberA).toHaveBeenCalledExactlyOnceWith(100, 250);
    expect(subscriberB).toHaveBeenCalledExactlyOnceWith(100, 250);
  });

  it('handles zero-argument event emissions cleanly', () => {
    const registry = createMockEventRegistry();
    const hub = createEventHub<MockEventMap>(registry);
    const callback = vi.fn();

    hub.subscribe('onDraw', callback);
    hub.emit('onDraw');

    expect(callback).toHaveBeenCalledExactlyOnceWith();
  });

  it('does not throw or fail when emitting an event with no subscribers', () => {
    const registry = createMockEventRegistry();
    const hub = createEventHub<MockEventMap>(registry);

    expect(() => hub.emit('onNodeAdded', { id: '1' })).not.toThrow();
  });

  it('exposes a Set containing all unique event names in the keys property', () => {
    const registry = createMockEventRegistry();
    const hub = createEventHub<MockEventMap>(registry);

    expect(hub.keys).toBeInstanceOf(Set);
    expect(hub.keys.size).toBe(3);
    expect(hub.keys).toContain('onNodeAdded');
    expect(hub.keys).toContain('onDraw');
    expect(hub.keys).toContain('onCoordinatesChange');
  });
});
