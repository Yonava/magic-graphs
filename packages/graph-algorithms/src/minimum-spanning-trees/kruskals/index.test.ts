import fc from 'fast-check';
import { describe, expect, it } from 'vitest';

import { graphArbitrary } from '../graphGenerator.ts';
import kruskals from './index.ts';

type Node = {
  id: string;
};

type Edge = {
  id: string;
  source: string;
  target: string;
  weight: number;
};

describe('kruskals', () => {
  it('finds the minimum spanning tree of a simple graph', () => {
    const nodes: Node[] = [{ id: 'A' }, { id: 'B' }, { id: 'C' }, { id: 'D' }];

    const edges: Edge[] = [
      { id: 'AB', source: 'A', target: 'B', weight: 1 },
      { id: 'AC', source: 'A', target: 'C', weight: 4 },
      { id: 'BC', source: 'B', target: 'C', weight: 2 },
      { id: 'BD', source: 'B', target: 'D', weight: 5 },
      { id: 'CD', source: 'C', target: 'D', weight: 3 },
    ];

    const result = kruskals(nodes, edges);

    expect(result.edges.map((e) => e.id)).toEqual(['AB', 'BC', 'CD']);

    expect(result.totalWeight).toBe(6);
  });

  it('does not include cycles', () => {
    const nodes: Node[] = [{ id: 'A' }, { id: 'B' }, { id: 'C' }];

    const edges: Edge[] = [
      { id: 'AB', source: 'A', target: 'B', weight: 1 },
      { id: 'BC', source: 'B', target: 'C', weight: 2 },
      { id: 'AC', source: 'A', target: 'C', weight: 3 },
    ];

    const result = kruskals(nodes, edges);

    expect(result.edges).toHaveLength(2);
    expect(result.totalWeight).toBe(3);
  });

  it('handles a graph where edges are not sorted', () => {
    const nodes: Node[] = [{ id: 'A' }, { id: 'B' }, { id: 'C' }];

    const edges: Edge[] = [
      { id: 'AC', source: 'A', target: 'C', weight: 10 },
      { id: 'BC', source: 'B', target: 'C', weight: 1 },
      { id: 'AB', source: 'A', target: 'B', weight: 5 },
    ];

    const result = kruskals(nodes, edges);

    expect(result.edges.map((e) => e.id)).toEqual(['BC', 'AB']);

    expect(result.totalWeight).toBe(6);
  });

  it('handles a single node graph', () => {
    const nodes: Node[] = [{ id: 'A' }];

    const result = kruskals(nodes, []);

    expect(result.edges).toEqual([]);
    expect(result.totalWeight).toBe(0);
  });

  it('handles a disconnected graph as a minimum spanning forest', () => {
    const nodes: Node[] = [{ id: 'A' }, { id: 'B' }, { id: 'C' }, { id: 'D' }];

    const edges: Edge[] = [
      { id: 'AB', source: 'A', target: 'B', weight: 1 },
      { id: 'CD', source: 'C', target: 'D', weight: 2 },
    ];

    const result = kruskals(nodes, edges);

    expect(result.edges.map((e) => e.id)).toEqual(['AB', 'CD']);

    expect(result.totalWeight).toBe(3);
  });

  it('handles equal weight edges', () => {
    const nodes: Node[] = [{ id: 'A' }, { id: 'B' }, { id: 'C' }];

    const edges: Edge[] = [
      { id: 'AB', source: 'A', target: 'B', weight: 1 },
      { id: 'BC', source: 'B', target: 'C', weight: 1 },
      { id: 'AC', source: 'A', target: 'C', weight: 1 },
    ];

    const result = kruskals(nodes, edges);

    expect(result.edges).toHaveLength(2);
    expect(result.totalWeight).toBe(2);
  });
});

describe('properties', () => {
  it('never returns more than n-1 edges', () => {
    fc.assert(
      fc.property(graphArbitrary, ({ nodes, edges }) => {
        const result = kruskals(nodes, edges);

        expect(result.edges.length).toBeLessThanOrEqual(nodes.length - 1);
      }),
    );
  });

  it('only returns edges from the input graph', () => {
    fc.assert(
      fc.property(graphArbitrary, ({ nodes, edges }) => {
        const result = kruskals(nodes, edges);

        const originalIds = new Set(edges.map((edge) => edge.id));

        result.edges.forEach((edge) => {
          expect(originalIds.has(edge.id)).toBe(true);
        });
      }),
    );
  });

  it('calculates the correct total weight', () => {
    fc.assert(
      fc.property(graphArbitrary, ({ nodes, edges }) => {
        const result = kruskals(nodes, edges);

        const expected = result.edges.reduce(
          (sum, edge) => sum + edge.weight,
          0,
        );

        expect(result.totalWeight).toBe(expected);
      }),
    );
  });
});

it('never creates cycles', () => {
  fc.assert(
    fc.property(graphArbitrary, ({ nodes, edges }) => {
      const result = kruskals(nodes, edges);

      expect(hasCycle(nodes, result.edges)).toBe(false);
    }),
  );
});

it('ignores unnecessary expensive edges', () => {
  fc.assert(
    fc.property(graphArbitrary, ({ nodes, edges }) => {
      if (nodes.length < 2) return;

      const before = kruskals(nodes, edges);

      const expensiveEdge = {
        id: 'expensive',
        source: nodes[0].id,
        target: nodes[1].id,
        weight: Number.MAX_SAFE_INTEGER,
      };

      const after = kruskals(nodes, [...edges, expensiveEdge]);

      expect(after.totalWeight).toBe(before.totalWeight);
    }),
  );
});

it('handles an empty graph', () => {
  const result = kruskals([], []);

  expect(result.edges).toEqual([]);
  expect(result.totalWeight).toBe(0);
});

function hasCycle(nodes: Node[], edges: Edge[]) {
  const parent = new Map<string, string>();

  const find = (id: string): string => {
    if (parent.get(id) !== id) {
      parent.set(id, find(parent.get(id)!));
    }

    return parent.get(id)!;
  };

  const union = (a: string, b: string) => {
    const rootA = find(a);
    const rootB = find(b);

    if (rootA === rootB) return false;

    parent.set(rootA, rootB);
    return true;
  };

  nodes.forEach((node) => {
    parent.set(node.id, node.id);
  });

  for (const edge of edges) {
    if (!union(edge.source, edge.target)) {
      return true;
    }
  }

  return false;
}
