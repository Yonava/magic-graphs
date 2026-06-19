import { CoreNode } from '@magic/graph/types';
import { describe, expect, it } from 'vitest';

import { rotateNodeZIndexes } from './rotateNodeZIndexes.ts';

const node = (id: string): CoreNode => ({ id }) as CoreNode;

const makeGetZ = (zMap: Record<string, number>) => (id: string) => zMap[id];

const applyUpdates = (
  zMap: Record<string, number>,
  updates: ReturnType<typeof rotateNodeZIndexes>,
): Record<string, number> => {
  const result = { ...zMap };
  for (const u of updates) {
    result[u.nodeId] = (u.update as { z: number }).z;
  }
  return result;
};

describe(rotateNodeZIndexes, () => {
  it('returns no updates when the node already has the best z score', () => {
    const nodes = [node('a'), node('b'), node('c')];
    const zMap = { a: 2, b: 1, c: 0 };
    const updates = rotateNodeZIndexes('a', nodes, makeGetZ(zMap));
    expect(updates).toHaveLength(0);
  });

  it('returns no updates when the node z score equals the best z score', () => {
    const nodes = [node('a'), node('b'), node('c')];
    const zMap = { a: 5, b: 5, c: 0 };
    const updates = rotateNodeZIndexes('b', nodes, makeGetZ(zMap));
    expect(updates).toHaveLength(0);
  });

  it('promotes the node to the top z score', () => {
    const nodes = [node('a'), node('b'), node('c')];
    const zMap = { a: 2, b: 1, c: 0 };
    const updates = rotateNodeZIndexes('c', nodes, makeGetZ(zMap));
    const result = applyUpdates(zMap, updates);
    expect(result['c']).toBe(2);
  });

  it('does not change nodes ranked below the target node', () => {
    const nodes = [node('a'), node('b'), node('c'), node('d')];
    const zMap = { a: 3, b: 2, c: 1, d: 0 };
    const updates = rotateNodeZIndexes('b', nodes, makeGetZ(zMap));
    const result = applyUpdates(zMap, updates);
    expect(result['c']).toBe(1);
    expect(result['d']).toBe(0);
  });

  it('rotates higher-ranked nodes down by one slot', () => {
    const nodes = [node('a'), node('b'), node('c'), node('d')];
    const zMap = { a: 3, b: 2, c: 1, d: 0 };
    const updates = rotateNodeZIndexes('c', nodes, makeGetZ(zMap));
    const result = applyUpdates(zMap, updates);
    expect(result).toMatchObject({ a: 2, b: 1, c: 3, d: 0 });
  });

  it('handles a full rotation from worst to best', () => {
    const nodes = [node('a'), node('b'), node('c'), node('d')];
    const zMap = { a: 3, b: 2, c: 1, d: 0 };
    const updates = rotateNodeZIndexes('d', nodes, makeGetZ(zMap));
    const result = applyUpdates(zMap, updates);
    expect(result).toMatchObject({ a: 2, b: 1, c: 0, d: 3 });
  });

  it('returns no updates for a single node', () => {
    const nodes = [node('a')];
    const zMap = { a: 0 };
    const updates = rotateNodeZIndexes('a', nodes, makeGetZ(zMap));
    expect(updates).toHaveLength(0);
  });

  it('produces a closed set — z scores after updates equal z scores before', () => {
    const nodes = [node('a'), node('b'), node('c'), node('d')];
    const zMap = { a: 10, b: 7, c: 3, d: 1 };
    const updates = rotateNodeZIndexes('d', nodes, makeGetZ(zMap));
    const result = applyUpdates(zMap, updates);
    const before = Object.values(zMap).sort((a, b) => a - b);
    const after = Object.values(result).sort((a, b) => a - b);
    expect(after).toEqual(before);
  });
});
