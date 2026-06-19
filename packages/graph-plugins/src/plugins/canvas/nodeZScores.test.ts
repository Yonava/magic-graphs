import { CoreNode } from '@magic/graph/types';
import { describe, expect, it } from 'vitest';

import { getNodeZScores } from './nodeZScores.ts';

const node = (id: string): CoreNode => ({ id }) as CoreNode;

const makePositions = (zMap: Record<string, number>) => ({
  get: (id: string) => ({ z: zMap[id] }),
});

describe(getNodeZScores, () => {
  it('returns an empty map for an empty node list', () => {
    const result = getNodeZScores({
      nodes: [],
      positions: makePositions({}) as any,
    });
    expect(result.size).toBe(0);
  });

  it('returns a single entry with score 0 for one node', () => {
    const nodes = [node('a')];
    const result = getNodeZScores({
      nodes,
      positions: makePositions({ a: 5 }) as any,
    });
    expect(result.get('a')).toBe(0);
  });

  it('assigns lower scores to nodes with higher z positions', () => {
    const nodes = [node('a'), node('b'), node('c')];
    const positions = makePositions({ a: 0, b: 5, c: 10 });
    const result = getNodeZScores({ nodes, positions: positions as any });
    // c has highest z -> lowest score, a has lowest z -> highest score
    expect(result.get('c')!).toBeLessThan(result.get('b')!);
    expect(result.get('b')!).toBeLessThan(result.get('a')!);
  });

  it('scores are multiples of 1/n', () => {
    const nodes = [node('a'), node('b'), node('c')];
    const positions = makePositions({ a: 2, b: 1, c: 0 });
    const result = getNodeZScores({ nodes, positions: positions as any });
    const increment = 1 / 3;
    const scores = [result.get('a')!, result.get('b')!, result.get('c')!].sort(
      (x, y) => x - y,
    );
    expect(scores).toEqual([0, increment, 2 * increment]);
  });

  it('uses array index as tie-breaker when z scores are equal', () => {
    const nodes = [node('a'), node('b'), node('c')];
    const positions = makePositions({ a: 1, b: 1, c: 1 });
    const result = getNodeZScores({ nodes, positions: positions as any });
    // tie-breaker: higher array index sorts first -> lower score
    // c (index 2) -> 0, b (index 1) -> 1/3, a (index 0) -> 2/3
    expect(result.get('c')!).toBeLessThan(result.get('b')!);
    expect(result.get('b')!).toBeLessThan(result.get('a')!);
  });

  it('all nodes receive a unique score', () => {
    const nodes = [node('a'), node('b'), node('c'), node('d')];
    const positions = makePositions({ a: 3, b: 1, c: 4, d: 2 });
    const result = getNodeZScores({ nodes, positions: positions as any });
    const scores = [...result.values()];
    expect(new Set(scores).size).toBe(scores.length);
  });

  it('produces exactly one entry per node', () => {
    const nodes = [node('a'), node('b'), node('c')];
    const positions = makePositions({ a: 0, b: 1, c: 2 });
    const result = getNodeZScores({ nodes, positions: positions as any });
    expect(result.size).toBe(nodes.length);
  });
});
