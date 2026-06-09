import { describe, expect, it } from 'vitest';

import { useDragState } from './useDragState.ts';

type Item = { x: number; y: number };

const makeState = (item: Item) => useDragState<{ item: Item }>(() => item);

describe(useDragState, () => {
  describe('startDrag', () => {
    it('records the starting cursor position', () => {
      const item = { x: 10, y: 20 };
      const state = makeState(item);
      state.startDrag({ x: 5, y: 5 }, { item });
      const result = state.applyMove({ x: 6, y: 7 });
      expect(result).toMatchObject({ x: 11, y: 22 });
    });
  });

  describe('stopDrag', () => {
    it('returns the attached data and ends the drag', () => {
      const item = { x: 0, y: 0 };
      const state = makeState(item);
      state.startDrag({ x: 0, y: 0 }, { item });
      const data = state.stopDrag();
      expect(data).toEqual({ item });
      expect(state.stopDrag()).toBeUndefined();
    });

    it('returns undefined when no drag is active', () => {
      const state = makeState({ x: 0, y: 0 });
      expect(state.stopDrag()).toBeUndefined();
    });
  });

  describe('applyMove', () => {
    it('returns undefined when no drag is active', () => {
      const state = makeState({ x: 0, y: 0 });
      expect(state.applyMove({ x: 5, y: 5 })).toBeUndefined();
    });

    it('computes new position from cursor delta', () => {
      const item = { x: 100, y: 200 };
      const state = makeState(item);
      state.startDrag({ x: 10, y: 10 }, { item });
      const result = state.applyMove({ x: 13, y: 8 });
      expect(result).toMatchObject({ x: 103, y: 198 });
    });

    it('accumulates deltas across multiple moves', () => {
      const item = { x: 0, y: 0 };
      const state = useDragState<{ item: Item }>(() => item);
      state.startDrag({ x: 0, y: 0 }, { item });

      let result = state.applyMove({ x: 3, y: 4 });
      item.x = result!.x;
      item.y = result!.y;

      result = state.applyMove({ x: 5, y: 6 });
      expect(result).toMatchObject({ x: 5, y: 6 });
    });

    it('includes the attached data in the return value', () => {
      const item = { x: 0, y: 0 };
      const data = { item };
      const state = makeState(item);
      state.startDrag({ x: 0, y: 0 }, data);
      const result = state.applyMove({ x: 1, y: 1 });
      expect(result?.data).toBe(data);
    });
  });
});
