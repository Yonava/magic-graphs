import { describe, expect, it, vi } from 'vitest';

import { UNRECOGNIZED_KEY, mergeEventHubs } from './mergeEventHubs.ts';

const createMockHub = (keys: string[]) => ({
  keys: new Set(keys),
  subscribe: vi.fn(),
  unsubscribe: vi.fn(),
  emit: vi.fn(),
});

describe('mergeEventHubs', () => {
  it('should route unique events to their respective hubs', () => {
    const hub1 = createMockHub(['onGraphChange']);
    const hub2 = createMockHub(['onNodeAdded']);
    const merged = mergeEventHubs(hub1 as any, hub2 as any);

    const cb = () => {};

    merged.subscribe('onGraphChange', cb);
    expect(hub1.subscribe).toHaveBeenCalledExactlyOnceWith('onGraphChange', cb);
    expect(hub2.subscribe).not.toHaveBeenCalled();

    vi.clearAllMocks();

    const node = { id: 'node-1', label: '1' };

    merged.emit('onNodeAdded', node);
    expect(hub2.emit).toHaveBeenCalledExactlyOnceWith('onNodeAdded', node);
    expect(hub1.emit).not.toHaveBeenCalled();
  });

  it('should multicast overlapping events to BOTH hubs', () => {
    const hub1 = createMockHub(['onClick']);
    const hub2 = createMockHub(['onClick']);
    const merged = mergeEventHubs(hub1 as any, hub2 as any);

    const cb = () => {};
    merged.subscribe('onClick', cb);

    expect(hub1.subscribe).toHaveBeenCalledExactlyOnceWith('onClick', cb);
    expect(hub2.subscribe).toHaveBeenCalledExactlyOnceWith('onClick', cb);
  });

  it('should warn the user and safely exit if an event is completely unrecognized', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const hub1 = createMockHub(['onGraphChange']);
    const hub2 = createMockHub(['onUiZoom']);
    const merged = mergeEventHubs(hub1 as any, hub2 as any);

    merged.subscribe('someFakeEvent' as any, () => {});
    merged.unsubscribe('someFakeEvent' as any, () => {});
    merged.emit('someFakeEvent' as any);
    const warning = UNRECOGNIZED_KEY('someFakeEvent');

    expect(warnSpy).toBeCalledTimes(3);
    expect(warnSpy).toBeCalledWith(expect.stringContaining(warning));

    expect(hub1.emit).not.toHaveBeenCalled();
    expect(hub2.emit).not.toHaveBeenCalled();

    warnSpy.mockRestore();
  });

  it('should correctly expose a combined list of keys', () => {
    const hub1 = createMockHub(['a', 'b']);
    const hub2 = createMockHub(['b', 'c']);
    const merged = mergeEventHubs(hub1 as any, hub2 as any);

    expect(merged.keys).toContain('a');
    expect(merged.keys).toContain('b');
    expect(merged.keys).toContain('c');
    expect(merged.keys.size).toBe(3);
  });
});
