import { describe, expect, it, vi } from 'vitest';

import { createEventHub } from './createEventHub.ts';
import { mergeEventHubs } from './mergeEventHubs.ts';

type HubAEvents = { onClick: (x: number) => void };
type HubBEvents = { onHover: () => void };
type SharedEvents = { onFocus: () => void };

const makeRegistry = <T extends Record<string, any>>(keys: (keyof T)[]) =>
  Object.fromEntries(keys.map((k) => [k, new Set()])) as any;

const makeHub = <T extends Record<string, any>>(
  keys: (keyof T)[],
  hubId: string,
) => createEventHub<T>(makeRegistry<T>(keys), hubId);

describe('mergeEventHubs — handler behavior', () => {
  it('routes handle to the correct hub for a unique event', () => {
    const hubA = makeHub<HubAEvents>(['onClick'], 'hubA');
    const hubB = makeHub<HubBEvents>(['onHover'], 'hubB');
    const merged = mergeEventHubs(hubA, hubB);

    const cb = vi.fn();
    merged.handle('onClick', cb);
    merged.emit('onClick', 42);

    expect(cb).toHaveBeenCalledExactlyOnceWith(42, expect.any(Function));
  });

  it('multicasts handle to both hubs for a shared event', () => {
    const hubA = makeHub<SharedEvents>(['onFocus'], 'hubA');
    const hubB = makeHub<SharedEvents>(['onFocus'], 'hubB');
    const merged = mergeEventHubs(hubA, hubB);

    const cb = vi.fn();
    merged.handle('onFocus', cb);

    // emit on each hub separately to confirm both registered the handler
    hubA.emit('onFocus');
    hubB.emit('onFocus');

    expect(cb).toHaveBeenCalledTimes(2);
  });

  it('fires hub1 handlers before hub2 handlers on a shared event', () => {
    const hubA = makeHub<HubAEvents>(['onClick'], 'hubA');
    const hubB = makeHub<HubAEvents>(['onClick'], 'hubB');
    const merged = mergeEventHubs(hubA, hubB);

    const order: string[] = [];
    hubB.handle('onClick', () => order.push('hubB'));
    hubA.handle('onClick', () => order.push('hubA'));
    merged.emit('onClick', 0);

    expect(order).toEqual(['hubA', 'hubB']);
  });

  it('stops propagation when consume is called', () => {
    const hubA = makeHub<HubAEvents>(['onClick'], 'hubA');
    const hubB = makeHub<HubBEvents>(['onHover'], 'hubB');
    const merged = mergeEventHubs(hubA, hubB);

    const first = vi.fn((_x: number, consume: () => void) => consume());
    const second = vi.fn();
    // @ts-expect-error thanks claude code
    merged.handle('onClick', first);
    merged.handle('onClick', second);
    merged.emit('onClick', 1);

    expect(first).toHaveBeenCalledOnce();
    expect(second).not.toHaveBeenCalled();
  });

  it('unhandle via merged interface removes the handler', () => {
    const hubA = makeHub<HubAEvents>(['onClick'], 'hubA');
    const hubB = makeHub<HubBEvents>(['onHover'], 'hubB');
    const merged = mergeEventHubs(hubA, hubB);

    const cb = vi.fn();
    merged.handle('onClick', cb);
    merged.unhandle('onClick', cb);
    merged.emit('onClick', 1);

    expect(cb).not.toHaveBeenCalled();
  });

  it('warns and does not throw when handling an unrecognized event', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const hubA = makeHub<HubAEvents>(['onClick'], 'hubA');
    const hubB = makeHub<HubBEvents>(['onHover'], 'hubB');
    const merged = mergeEventHubs(hubA, hubB);

    expect(() => merged.handle('unknownEvent' as any, vi.fn())).not.toThrow();
    expect(warnSpy).toHaveBeenCalledOnce();

    warnSpy.mockRestore();
  });
});
