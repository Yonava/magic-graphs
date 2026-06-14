import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  CoreEventMap,
  CoreEventRegistry,
  createCoreEventRegistry,
} from '../core/events.ts';
import { EventHub, createEventHub } from './createEventHub.ts';

describe(createEventHub, () => {
  let registry: CoreEventRegistry;
  let hub: EventHub<CoreEventMap>;

  beforeEach(() => {
    registry = createCoreEventRegistry();
    hub = createEventHub(registry);
  });

  it('successfully registers a callback via subscribe', () => {
    const callback = vi.fn();
    hub.subscribe('onNodesAdded', callback);
    expect(registry.onNodesAdded.has(callback)).toBe(true);
    expect(registry.onNodesAdded.size).toBe(1);
  });

  it('safely unregisters a callback via unsubscribe', () => {
    const callback = vi.fn();
    hub.subscribe('onNodesAdded', callback);
    hub.unsubscribe('onNodesAdded', callback);
    expect(registry.onNodesAdded.has(callback)).toBe(false);
    expect(registry.onNodesAdded.size).toBe(0);
  });

  it('broadcasts to all subscribers with exact parameters when emit is invoked', () => {
    const subscriberA = vi.fn();
    const subscriberB = vi.fn();
    hub.subscribe('onNodesAdded', subscriberA);
    hub.subscribe('onNodesAdded', subscriberB);
    hub.emit('onNodesAdded', [{ id: '1', label: 'a' }]);
    expect(subscriberA).toHaveBeenCalledExactlyOnceWith([
      { id: '1', label: 'a' },
    ]);
    expect(subscriberB).toHaveBeenCalledExactlyOnceWith([
      { id: '1', label: 'a' },
    ]);
  });

  it('handles zero-argument event emissions cleanly', () => {
    const callback = vi.fn();
    hub.subscribe('onStructureChange', callback);
    hub.emit('onStructureChange');
    expect(callback).toHaveBeenCalledExactlyOnceWith();
  });

  it('does not throw or fail when emitting an event with no subscribers', () => {
    expect(() =>
      hub.emit('onNodesAdded', [{ id: '1', label: 'a' }]),
    ).not.toThrow();
  });

  it('exposes a Set containing all unique event names in the keys property', () => {
    expect(hub.keys).toBeInstanceOf(Set);
    expect(hub.keys).toContain('onNodesAdded');
    expect(hub.keys).toContain('onStructureChange');
  });
});
