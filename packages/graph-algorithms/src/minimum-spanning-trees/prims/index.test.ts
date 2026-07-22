import fc from 'fast-check';
import Fraction from 'fraction.js';
import { describe, expect, it } from 'vitest';

import {
  disconnectedGraphArbitrary,
  graphArbitrary,
} from '../graphGenerator.ts';
import { hasCycle } from '../helpers.ts';
import type { Edge, Node } from '../types.ts';
import { prims } from './index.ts';

describe(prims, () => {
  it('finds the minimum spanning tree of a simple graph', () => {
    const nodes: Node[] = [{ id: 'A' }, { id: 'B' }, { id: 'C' }, { id: 'D' }];

    const edges: Edge[] = [
      { id: 'AB', source: 'A', target: 'B', weight: new Fraction(1) },
      { id: 'AC', source: 'A', target: 'C', weight: new Fraction(4) },
      { id: 'BC', source: 'B', target: 'C', weight: new Fraction(2) },
      { id: 'BD', source: 'B', target: 'D', weight: new Fraction(5) },
      { id: 'CD', source: 'C', target: 'D', weight: new Fraction(3) },
    ];

    const result = prims(nodes, edges);

    expect(result.edges.map((e) => e.id)).toEqual(['AB', 'BC', 'CD']);
    expect(result.totalWeight.equals(new Fraction(6))).toBe(true);
  });

  it('does not include cycles', () => {
    const nodes: Node[] = [{ id: 'A' }, { id: 'B' }, { id: 'C' }];

    const edges: Edge[] = [
      { id: 'AB', source: 'A', target: 'B', weight: new Fraction(1) },
      { id: 'BC', source: 'B', target: 'C', weight: new Fraction(2) },
      { id: 'AC', source: 'A', target: 'C', weight: new Fraction(3) },
    ];

    const result = prims(nodes, edges);

    expect(result.edges).toHaveLength(2);
    expect(result.totalWeight.equals(new Fraction(3))).toBe(true);
  });

  it('handles a single node graph', () => {
    const nodes: Node[] = [{ id: 'A' }];

    const result = prims(nodes, []);

    expect(result.edges).toEqual([]);
    expect(result.totalWeight.equals(new Fraction(0))).toBe(true);
  });

  it('handles a disconnected graph as a minimum spanning forest', () => {
    const nodes: Node[] = [{ id: 'A' }, { id: 'B' }, { id: 'C' }, { id: 'D' }];

    const edges: Edge[] = [
      { id: 'AB', source: 'A', target: 'B', weight: new Fraction(1) },
      { id: 'CD', source: 'C', target: 'D', weight: new Fraction(2) },
    ];

    const result = prims(nodes, edges);

    expect(result.edges.map((e) => e.id)).toEqual(['AB', 'CD']);
    expect(result.totalWeight.equals(new Fraction(3))).toBe(true);
    expect(result.connected).toBe(false);
  });

  it('handles equal weight edges', () => {
    const nodes: Node[] = [{ id: 'A' }, { id: 'B' }, { id: 'C' }];

    const edges: Edge[] = [
      { id: 'AB', source: 'A', target: 'B', weight: new Fraction(1) },
      { id: 'BC', source: 'B', target: 'C', weight: new Fraction(1) },
      { id: 'AC', source: 'A', target: 'C', weight: new Fraction(1) },
    ];

    const result = prims(nodes, edges);

    expect(result.edges).toHaveLength(2);
    expect(result.totalWeight.equals(new Fraction(2))).toBe(true);
  });

  it('handles an empty graph', () => {
    const result = prims([], []);

    expect(result.edges).toEqual([]);
    expect(result.totalWeight.equals(new Fraction(0))).toBe(true);
  });

  it('ignores self-loops', () => {
    const nodes: Node[] = [{ id: 'A' }, { id: 'B' }];

    const edges: Edge[] = [
      { id: 'AA', source: 'A', target: 'A', weight: new Fraction(-1) },
      { id: 'AB', source: 'A', target: 'B', weight: new Fraction(1) },
    ];

    const result = prims(nodes, edges);

    expect(result.edges.map((e) => e.id)).toEqual(['AB']);
    expect(result.totalWeight.equals(new Fraction(1))).toBe(true);
  });

  it('picks the cheapest of parallel edges between the same nodes', () => {
    const nodes: Node[] = [{ id: 'A' }, { id: 'B' }, { id: 'C' }];

    const edges: Edge[] = [
      { id: 'AB-expensive', source: 'A', target: 'B', weight: new Fraction(5) },
      { id: 'AB-cheap', source: 'A', target: 'B', weight: new Fraction(1) },
      { id: 'BC', source: 'B', target: 'C', weight: new Fraction(2) },
    ];

    const result = prims(nodes, edges);

    expect(result.edges.map((e) => e.id)).toEqual(['AB-cheap', 'BC']);
    expect(result.totalWeight.equals(new Fraction(3))).toBe(true);
  });

  it('does not mutate the input nodes or edges', () => {
    const nodes: Node[] = [{ id: 'A' }, { id: 'B' }];
    const edges: Edge[] = [
      { id: 'AB', source: 'A', target: 'B', weight: new Fraction(1) },
    ];
    const nodesSnapshot = structuredClone(nodes);
    const edgesSnapshot = edges.map((edge) => ({ ...edge }));

    prims(nodes, edges);

    expect(nodes).toEqual(nodesSnapshot);
    expect(edges.map((edge) => ({ ...edge }))).toEqual(edgesSnapshot);
  });
});

describe('properties', () => {
  it('never returns more than n-1 edges', () => {
    fc.assert(
      fc.property(graphArbitrary, ({ nodes, edges }) => {
        const result = prims(nodes, edges);

        expect(result.edges.length).toBeLessThanOrEqual(nodes.length - 1);
      }),
      { numRuns: 10 },
    );
  });

  it('only returns edges from the input graph', () => {
    fc.assert(
      fc.property(graphArbitrary, ({ nodes, edges }) => {
        const result = prims(nodes, edges);

        const originalIds = new Set(edges.map((edge) => edge.id));

        result.edges.forEach((edge) => {
          expect(originalIds.has(edge.id)).toBe(true);
        });
      }),
      { numRuns: 10 },
    );
  });

  it('calculates the correct total weight', () => {
    fc.assert(
      fc.property(graphArbitrary, ({ nodes, edges }) => {
        const result = prims(nodes, edges);

        const expected = result.edges.reduce(
          (sum, edge) => sum.add(edge.weight),
          new Fraction(0),
        );

        expect(result.totalWeight.equals(expected)).toBe(true);
      }),
      { numRuns: 10 },
    );
  });
});

it('never creates cycles', () => {
  fc.assert(
    fc.property(graphArbitrary, ({ nodes, edges }) => {
      const result = prims(nodes, edges);

      expect(hasCycle(nodes, result.edges)).toBe(false);
    }),
    { numRuns: 10 },
  );
});

it('ignores unnecessary expensive edges', () => {
  fc.assert(
    fc.property(graphArbitrary, ({ nodes, edges }) => {
      if (nodes.length < 2) return;

      const before = prims(nodes, edges);

      const expensiveEdge = {
        id: 'expensive',
        source: nodes[0].id,
        target: nodes[1].id,
        weight: new Fraction(Number.MAX_SAFE_INTEGER),
      };

      const after = prims(nodes, [...edges, expensiveEdge]);

      expect(after.totalWeight.equals(before.totalWeight)).toBe(true);
    }),
    { numRuns: 10 },
  );
});

it('builds a minimum spanning forest for disconnected graphs', () => {
  fc.assert(
    fc.property(disconnectedGraphArbitrary, ({ nodes, edges }) => {
      const result = prims(nodes, edges);

      expect(result.connected).toBe(false);
      expect(hasCycle(nodes, result.edges)).toBe(false);
      // exactly two components, so the forest has n - 2 edges
      expect(result.edges.length).toBe(nodes.length - 2);
    }),
    { numRuns: 10 },
  );
});
