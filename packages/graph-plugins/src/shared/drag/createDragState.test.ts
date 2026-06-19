import { describe, expect, it } from 'vitest';

import { createDragState } from './createDragState.ts';

type Item = { x: number; y: number };

describe(createDragState, () => {
  describe('startDrag', () => {
    it('records the starting cursor position', () => {
      const state = createDragState<{ item: Item }>();
      state.startDrag({ x: 5, y: 5 }, { item: { x: 10, y: 20 } });
      const result = state.applyMove({ x: 6, y: 7 });
      expect(result?.deltas).toEqual({ dx: 1, dy: 2 });
    });
  });

  describe('stopDrag', () => {
    it('returns the attached data and ends the drag', () => {
      const state = createDragState<{ item: Item }>();
      const item = { x: 0, y: 0 };
      state.startDrag({ x: 0, y: 0 }, { item });
      const data = state.stopDrag();
      expect(data).toEqual({ item });
      expect(state.stopDrag()).toBeUndefined();
    });

    it('returns undefined when no drag is active', () => {
      const state = createDragState<{ item: Item }>();
      expect(state.stopDrag()).toBeUndefined();
    });
  });

  describe('applyMove', () => {
    it('returns undefined when no drag is active', () => {
      const state = createDragState<{ item: Item }>();
      expect(state.applyMove({ x: 5, y: 5 })).toBeUndefined();
    });

    it('computes deltas from cursor movement', () => {
      const state = createDragState<{ item: Item }>();
      state.startDrag({ x: 10, y: 10 }, { item: { x: 100, y: 200 } });
      const result = state.applyMove({ x: 13, y: 8 });
      expect(result?.deltas).toEqual({ dx: 3, dy: -2 });
    });

    it('accumulates deltas correctly across multiple moves', () => {
      const state = createDragState<{ item: Item }>();
      state.startDrag({ x: 0, y: 0 }, { item: { x: 0, y: 0 } });

      state.applyMove({ x: 3, y: 4 });
      const result = state.applyMove({ x: 5, y: 6 });
      expect(result?.deltas).toEqual({ dx: 2, dy: 2 });
    });

    it('includes the attached data in the return value', () => {
      const state = createDragState<{ item: Item }>();
      const data = { item: { x: 0, y: 0 } };
      state.startDrag({ x: 0, y: 0 }, data);
      const result = state.applyMove({ x: 1, y: 1 });
      expect(result?.data).toBe(data);
    });
  });
});
