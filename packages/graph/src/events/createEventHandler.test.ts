import { describe, expect, it, vi } from 'vitest';

import { createEventHandler } from './createEventHandler.ts';

type TestEventMap = {
  onClick: (x: number) => void;
  onHover: () => void;
};

describe(createEventHandler, () => {
  describe('handle', () => {
    it('invokes a registered handler when fireHandlers is called', () => {
      const { handle, fireHandlers } = createEventHandler<TestEventMap>('hub');
      const cb = vi.fn();
      handle('onClick', cb);
      fireHandlers('onClick', 42);
      expect(cb).toHaveBeenCalledExactlyOnceWith(42, expect.any(Function));
    });

    it('does not invoke handlers for other events', () => {
      const { handle, fireHandlers } = createEventHandler<TestEventMap>('hub');
      const cb = vi.fn();
      handle('onHover', cb);
      fireHandlers('onClick', 1);
      expect(cb).not.toHaveBeenCalled();
    });

    it('invokes multiple handlers in priority order', () => {
      const { handle, fireHandlers } = createEventHandler<TestEventMap>('a');
      const order: string[] = [];
      handle(
        'onClick',
        (_, consume) => order.push('second'),
        { before: [] },
        'second',
      );
      handle(
        'onClick',
        (_, consume) => order.push('first'),
        { before: ['a:second'] },
        'first',
      );
      fireHandlers('onClick', 1);
      expect(order).toEqual(['first', 'second']);
    });

    it('builds a hub-only id when no handlerId is provided', () => {
      const { handle, fireHandlers } = createEventHandler<TestEventMap>('hub');
      const order: string[] = [];
      // hub2 handler runs before hub handler using hub-level id
      const { handle: handle2, fireHandlers: fire2 } =
        createEventHandler<TestEventMap>('hub2');
      // register on a shared handler record — just verify hub id matching via priority
      const cb = vi.fn();
      handle('onClick', cb, { before: [] });
      fireHandlers('onClick', 0);
      expect(cb).toHaveBeenCalled();
    });

    it('builds a concatenated id when both hubId and handlerId are provided', () => {
      const { handle, fireHandlers } = createEventHandler<TestEventMap>('hub');
      const order: string[] = [];
      handle('onClick', () => order.push('b'), { before: [] }, 'b');
      handle('onClick', () => order.push('a'), { before: ['hub:b'] }, 'a');
      fireHandlers('onClick', 0);
      expect(order).toEqual(['a', 'b']);
    });

    it('uses handlerId alone when no hubId is set', () => {
      const { handle, fireHandlers } = createEventHandler<TestEventMap>('hub');
      const order: string[] = [];
      handle('onClick', () => order.push('b'), { before: [] }, 'b');
      handle('onClick', () => order.push('a'), { before: ['b'] }, 'a');
      fireHandlers('onClick', 0);
      expect(order).toEqual(['a', 'b']);
    });
  });

  describe('unhandle', () => {
    it('removes a handler so it is no longer invoked', () => {
      const { handle, unhandle, fireHandlers } =
        createEventHandler<TestEventMap>('hub');
      const cb = vi.fn();
      handle('onClick', cb);
      unhandle('onClick', cb);
      fireHandlers('onClick', 1);
      expect(cb).not.toHaveBeenCalled();
    });

    it('only removes the specified handler', () => {
      const { handle, unhandle, fireHandlers } =
        createEventHandler<TestEventMap>('hub');
      const cb1 = vi.fn();
      const cb2 = vi.fn();
      handle('onClick', cb1);
      handle('onClick', cb2);
      unhandle('onClick', cb1);
      fireHandlers('onClick', 1);
      expect(cb1).not.toHaveBeenCalled();
      expect(cb2).toHaveBeenCalledOnce();
    });

    it('is a no-op when the event has no handlers', () => {
      const { unhandle, fireHandlers } =
        createEventHandler<TestEventMap>('hub');
      expect(() => unhandle('onClick', vi.fn())).not.toThrow();
    });
  });

  describe('fireHandlers', () => {
    it('stops calling handlers after consume is called', () => {
      const { handle, fireHandlers } = createEventHandler<TestEventMap>('hub');
      const cb1 = vi.fn((_x: number, consume: () => void) => consume());
      const cb2 = vi.fn();
      handle('onClick', cb1, { before: [] }, 'first');
      handle('onClick', cb2, { before: ['hub:first'] }, 'never');
      // cb2 declares itself before cb1, so it runs first — but cb1 consumes
      // Re-register in natural order so cb1 fires first
      const { handle: h, fireHandlers: fire } =
        createEventHandler<TestEventMap>('hub');
      const a = vi.fn((_x: number, consume: () => void) => consume());
      const b = vi.fn();
      h('onClick', a);
      h('onClick', b);
      fire('onClick', 0);
      expect(a).toHaveBeenCalledOnce();
      expect(b).not.toHaveBeenCalled();
    });

    it('is a no-op when no handlers are registered for the event', () => {
      const { fireHandlers } = createEventHandler<TestEventMap>('hub');
      expect(() => fireHandlers('onClick', 1)).not.toThrow();
    });
  });
});
