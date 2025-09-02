import type { GNode } from '@magic/graph/types';
import { describe, expect, it } from 'vitest';

import {
  centerNodesOnOriginCoordinates,
  getAverageCoordinates,
} from './helpers';

describe('getAverageCoordinates', () => {
  it('returns the average coordinates of nodes', () => {
    const nodes = [
      { x: 10, y: 20 },
      { x: 30, y: 40 },
      { x: 50, y: 60 },
    ];

    const result = getAverageCoordinates(nodes);
    expect(result).toEqual({ x: 30, y: 40 });
  });

  it('handles a single node', () => {
    const nodes = [{ x: 15, y: 25 }];

    const result = getAverageCoordinates(nodes);
    expect(result).toEqual({ x: 15, y: 25 });
  });

  it('handles edge case of 0 nodes', () => {
    const nodes: GNode[] = [];

    const result = getAverageCoordinates(nodes);
    expect(result).toEqual({ x: 0, y: 0 });
  });
});

describe('centerNodesOnOriginCoordinates', () => {
  it('centers nodes around (0, 0)', () => {
    const nodes = [
      { x: 10, y: 10 },
      { x: 20, y: 20 },
      { x: 30, y: 30 },
    ];

    const targetOrigin = { x: 0, y: 0 };
    const result = centerNodesOnOriginCoordinates(nodes, targetOrigin);

    expect(result).toEqual([
      { x: -10, y: -10 },
      { x: 0, y: 0 },
      { x: 10, y: 10 },
    ]);
  });

  it('centers nodes around (30, 20)', () => {
    const nodes = [
      { x: 0, y: 20 },
      { x: 30, y: 40 },
      { x: 30, y: 0 },
    ];

    const targetOrigin = { x: 30, y: 20 };
    const result = centerNodesOnOriginCoordinates(nodes, targetOrigin);

    expect(result).toEqual([
      { x: 10, y: 20 },
      { x: 40, y: 40 },
      { x: 40, y: 0 },
    ]);
  });

  it('handles a single node', () => {
    const nodes = [{ x: 5, y: 5 }];
    const targetOrigin = { x: 0, y: 0 };

    const result = centerNodesOnOriginCoordinates(nodes, targetOrigin);

    expect(result).toEqual([{ x: 0, y: 0 }]);
  });

  it('does not mutate the original array', () => {
    const nodes = [
      { x: 10, y: 20 },
      { x: 30, y: 40 },
    ];

    const targetOrigin = { x: 0, y: 0 };
    const originalNodes = JSON.parse(JSON.stringify(nodes));

    centerNodesOnOriginCoordinates(nodes, targetOrigin);

    expect(nodes).toEqual(originalNodes);
  });
});
