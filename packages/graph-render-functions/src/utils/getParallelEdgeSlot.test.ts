import { CoreEdge } from '@graph/primitives/types';
import { describe, expect, it } from 'vitest';

import { getParallelEdgeSlot } from './getParallelEdgeSlot.ts';

const edge = (id: string, source: string, target: string): CoreEdge => ({
  id,
  source,
  target,
});

const slotsOf = (edges: readonly CoreEdge[]) =>
  edges.map(({ id }) => getParallelEdgeSlot(id, edges));

describe('getParallelEdgeSlot', () => {
  it('leaves an edge that runs alone on the straight route', () => {
    const solo = edge('1', 'a', 'b');
    expect(getParallelEdgeSlot(solo.id, [solo])).toBe(0);
  });

  it('splits a pair evenly around the route', () => {
    expect(slotsOf([edge('1', 'a', 'b'), edge('2', 'a', 'b')])).toEqual([
      -0.5, 0.5,
    ]);
  });

  it('puts the two directions of a path on opposite sides', () => {
    // the reversed edge draws along a flipped perpendicular, so a matching sign would overlap its twin
    const [forward, backward] = slotsOf([
      edge('1', 'a', 'b'),
      edge('2', 'b', 'a'),
    ]);
    expect(Math.sign(forward!)).toBe(-Math.sign(backward!));
  });

  it('runs the middle edge of a trio straight through', () => {
    expect(
      slotsOf([edge('1', 'a', 'b'), edge('2', 'a', 'b'), edge('3', 'b', 'a')]),
    ).toEqual([-1, 0, 1]);
  });

  it('hands out the same slots no matter what order the path arrives in', () => {
    const edges = [
      edge('2', 'b', 'a'),
      edge('3', 'a', 'b'),
      edge('1', 'a', 'b'),
    ];
    const reversed = [...edges].reverse();

    for (const { id } of edges) {
      expect(getParallelEdgeSlot(id, edges)).toBe(
        getParallelEdgeSlot(id, reversed),
      );
    }
  });

  it('falls back to the straight route for an edge missing from its own path', () => {
    expect(getParallelEdgeSlot('9', [edge('1', 'a', 'b')])).toBe(0);
  });
});
