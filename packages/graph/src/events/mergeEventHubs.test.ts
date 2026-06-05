import { describe, expect, it, vi } from 'vitest';

import { UNRECOGNIZED_KEY, mergeEventHubs } from './mergeEventHubs.ts';

const createMockHub = (keys: string[]) => ({
  keys: new Set(keys),
  handle: vi.fn(),
  subscribe: vi.fn(),
  unsubscribe: vi.fn(),
  emit: vi.fn(),
});

describe(mergeEventHubs, () => {
  it('should route unique events to their respective hubs', () => {
    const hub1 = createMockHub(['onGraphChange']);
    const hub2 = createMockHub(['onNodeAdded']);
    const merged = mergeEventHubs(hub1, hub2);

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
    const merged = mergeEventHubs(hub1, hub2);

    const cb = () => {};
    merged.subscribe('onClick', cb);

    expect(hub1.subscribe).toHaveBeenCalledExactlyOnceWith('onClick', cb);
    expect(hub2.subscribe).toHaveBeenCalledExactlyOnceWith('onClick', cb);
  });

  it('should warn the user and safely exit if an event is completely unrecognized', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const hub1 = createMockHub(['onGraphChange']);
    const hub2 = createMockHub(['onUiZoom']);
    const merged = mergeEventHubs(hub1, hub2);

    merged.subscribe('someFakeEvent', () => {});
    merged.unsubscribe('someFakeEvent', () => {});
    merged.emit('someFakeEvent');
    const warning = UNRECOGNIZED_KEY('someFakeEvent');

    expect(warnSpy).toBeCalledTimes(3);
    expect(warnSpy).toBeCalledWith(expect.stringContaining(warning));

    expect(hub1.emit).not.toHaveBeenCalled();
    expect(hub2.emit).not.toHaveBeenCalled();

    warnSpy.mockRestore();
  });
});
