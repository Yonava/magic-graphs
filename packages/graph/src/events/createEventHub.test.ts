import { describe, expect, it, vi } from 'vitest';

import { createEventHub } from './createEventHub.ts';
import type { EventMapToEventBus } from './index.ts';

type MockEventMap = {
  onNodeAdded: (node: { id: string }) => void;
  onDraw: () => void;
  onCoordinatesChange: (x: number, y: number) => void;
};

const createMockEventBus = (): EventMapToEventBus<MockEventMap> => ({
  onNodeAdded: new Set(),
  onDraw: new Set(),
  onCoordinatesChange: new Set(),
});

describe('createEventHub', () => {
  it('should successfully register a callback via subscribe', () => {
    const bus = createMockEventBus();
    const hub = createEventHub<MockEventMap>(bus);
    const callback = vi.fn();

    hub.subscribe('onNodeAdded', callback);

    expect(bus.onNodeAdded.has(callback)).toBe(true);
    expect(bus.onNodeAdded.size).toBe(1);
  });

  it('should safely unregister a callback via unsubscribe', () => {
    const bus = createMockEventBus();
    const hub = createEventHub<MockEventMap>(bus);
    const callback = vi.fn();

    hub.subscribe('onNodeAdded', callback);
    expect(bus.onNodeAdded.size).toBe(1);

    hub.unsubscribe('onNodeAdded', callback);

    expect(bus.onNodeAdded.has(callback)).toBe(false);
    expect(bus.onNodeAdded.size).toBe(0);
  });

  it('should broadcast to all subscribers with exact parameters when emit is invoked', () => {
    const bus = createMockEventBus();
    const hub = createEventHub<MockEventMap>(bus);

    const subscriberA = vi.fn();
    const subscriberB = vi.fn();

    hub.subscribe('onCoordinatesChange', subscriberA);
    hub.subscribe('onCoordinatesChange', subscriberB);

    hub.emit('onCoordinatesChange', 100, 250);

    expect(subscriberA).toHaveBeenCalledExactlyOnceWith(100, 250);
    expect(subscriberB).toHaveBeenCalledExactlyOnceWith(100, 250);
  });

  it('should handle zero-argument event emissions cleanly', () => {
    const bus = createMockEventBus();
    const hub = createEventHub<MockEventMap>(bus);
    const callback = vi.fn();

    hub.subscribe('onDraw', callback);
    hub.emit('onDraw');

    expect(callback).toHaveBeenCalledExactlyOnceWith();
  });

  it('should not throw or fail when emitting an event with no subscribers', () => {
    const bus = createMockEventBus();
    const hub = createEventHub<MockEventMap>(bus);

    expect(() => hub.emit('onNodeAdded', { id: '1' })).not.toThrow();
  });

  it('should expose a Set containing all unique event names in the keys property', () => {
    const bus = createMockEventBus();
    const hub = createEventHub<MockEventMap>(bus);

    expect(hub.keys).toBeInstanceOf(Set);
    expect(hub.keys.size).toBe(3);
    expect(hub.keys).toContain('onNodeAdded');
    expect(hub.keys).toContain('onDraw');
    expect(hub.keys).toContain('onCoordinatesChange');
  });
});
