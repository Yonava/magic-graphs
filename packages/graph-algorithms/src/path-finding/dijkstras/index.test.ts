import { dijkstra } from './index.ts';
import { describe, it, expect } from 'vitest';
import Fraction from 'fraction.js';
import fc from 'fast-check';
import { graphArbitrary } from '../graphGenerator.ts';

describe(dijkstra, () => {
  it('should throw an error for a negative edge weight', () => {
    const nodes = [
      { id: 'A' },
      { id: 'B' },
    ];

    const edges = [
      { id: 'edge1', source: 'A', target: 'B', weight: new Fraction(-1) },
    ];

    expect(() => dijkstra(nodes, edges, 'A')).toThrowError(
      'Edge "edge1" has a negative weight. Dijkstra\'s algorithm requires non-negative edge weights.'
    );
  });
  it('should throw an error for an unknown start node', () => {
    const nodes = [
      { id: 'A' },
      { id: 'B' },
    ];

    const edges = [
      { id: 'edge1', source: 'A', target: 'B', weight: new Fraction(1) },
    ];

    expect(() => dijkstra(nodes, edges, 'C')).toThrowError(
      'Unknown start node "C".'
    );
  });
  it('should throw an error for an edge with an unknown source node', () => {
    const nodes = [
      { id: 'A' },
      { id: 'B' },
    ];

    const edges = [
      { id: 'edge1', source: 'C', target: 'B', weight: new Fraction(1) },
    ];

    expect(() => dijkstra(nodes, edges, 'A')).toThrowError(
      'Edge "edge1" references unknown source "C".'
    );
  });
  it('should find the shortest path in a simple graph', () => {
    const nodes = [
      { id: 'A' },
      { id: 'B' },
      { id: 'C' },
    ];

    const edges = [
      { id: 'edge1', source: 'A', target: 'B', weight: new Fraction(1) },
      { id: 'edge2', source: 'B', target: 'C', weight: new Fraction(2) },
      { id: 'edge3', source: 'A', target: 'C', weight: new Fraction(4) },
    ];

    const result = dijkstra(nodes, edges, 'A');

    expect(result.distances.get('A')?.equals(new Fraction(0))).toBe(true);
    expect(result.distances.get('B')?.equals(new Fraction(1))).toBe(true);
    expect(result.distances.get('C')?.equals(new Fraction(3))).toBe(true);

    expect(result.previous.get('A')).toBe(null);
    expect(result.previous.get('B')).toBe('A');
    expect(result.previous.get('C')).toBe('B');

    expect(result.connected).toBe(true);
  });

  it('should return only the start node for a graph with one node', () => {
    const nodes = [{ id: 'A' }];
    const edges: any[] = [];

    const result = dijkstra(nodes, edges, 'A');

    expect(result.distances.get('A')?.equals(new Fraction(0))).toBe(true);
    expect(result.previous.get('A')).toBe(null);
    expect(result.connected).toBe(true);
  });

  it('should leave unreachable nodes with null distance', () => {
    const nodes = [
      { id: 'A' },
      { id: 'B' },
      { id: 'C' },
    ];

    const edges = [
      {
        id: 'AB',
        source: 'A',
        target: 'B',
        weight: new Fraction(5),
      },
    ];

    const result = dijkstra(nodes, edges, 'A');

    expect(result.distances.get('A')?.equals(new Fraction(0))).toBe(true);
    expect(result.distances.get('B')?.equals(new Fraction(5))).toBe(true);
    expect(result.distances.get('C')).toBe(null);

    expect(result.previous.get('C')).toBe(null);
    expect(result.connected).toBe(false);
  });

  it('should prefer an indirect path when it is shorter', () => {
    const nodes = [
      { id: 'A' },
      { id: 'B' },
      { id: 'C' },
    ];

    const edges = [
      {
        id: 'AB',
        source: 'A',
        target: 'B',
        weight: new Fraction(2),
      },
      {
        id: 'BC',
        source: 'B',
        target: 'C',
        weight: new Fraction(2),
      },
      {
        id: 'AC',
        source: 'A',
        target: 'C',
        weight: new Fraction(10),
      },
    ];

    const result = dijkstra(nodes, edges, 'A');

    expect(result.distances.get('C')?.equals(new Fraction(4))).toBe(true);
    expect(result.previous.get('C')).toBe('B');
  });

  it('should handle zero-weight edges', () => {
    const nodes = [
      { id: 'A' },
      { id: 'B' },
      { id: 'C' },
    ];

    const edges = [
      {
        id: 'AB',
        source: 'A',
        target: 'B',
        weight: new Fraction(0),
      },
      {
        id: 'BC',
        source: 'B',
        target: 'C',
        weight: new Fraction(0),
      },
      {
        id: 'AC',
        source: 'A',
        target: 'C',
        weight: new Fraction(5),
      },
    ];

    const result = dijkstra(nodes, edges, 'A');

    expect(result.distances.get('B')?.equals(new Fraction(0))).toBe(true);
    expect(result.distances.get('C')?.equals(new Fraction(0))).toBe(true);

    expect(result.previous.get('B')).toBe('A');
    expect(result.previous.get('C')).toBe('B');
  });

  it('should use fractional edge weights', () => {
    const nodes = [
      { id: 'A' },
      { id: 'B' },
      { id: 'C' },
    ];

    const edges = [
      {
        id: 'AB',
        source: 'A',
        target: 'B',
        weight: new Fraction(1, 2),
      },
      {
        id: 'BC',
        source: 'B',
        target: 'C',
        weight: new Fraction(1, 4),
      },
      {
        id: 'AC',
        source: 'A',
        target: 'C',
        weight: new Fraction(1),
      },
    ];

    const result = dijkstra(nodes, edges, 'A');

    expect(result.distances.get('C')?.equals(new Fraction(3, 4))).toBe(true);
    expect(result.previous.get('C')).toBe('B');
  });

  it('should choose the cheaper of parallel edges', () => {
    const nodes = [
      { id: 'A' },
      { id: 'B' },
    ];

    const edges = [
      {
        id: 'AB1',
        source: 'A',
        target: 'B',
        weight: new Fraction(10),
      },
      {
        id: 'AB2',
        source: 'A',
        target: 'B',
        weight: new Fraction(3),
      },
    ];

    const result = dijkstra(nodes, edges, 'A');

    expect(result.distances.get('B')?.equals(new Fraction(3))).toBe(true);
    expect(result.previous.get('B')).toBe('A');
  });

  it('should ignore self-loops that do not improve a path', () => {
    const nodes = [
      { id: 'A' },
      { id: 'B' },
    ];

    const edges = [
      {
        id: 'AA',
        source: 'A',
        target: 'A',
        weight: new Fraction(5),
      },
      {
        id: 'AB',
        source: 'A',
        target: 'B',
        weight: new Fraction(2),
      },
    ];

    const result = dijkstra(nodes, edges, 'A');

    expect(result.distances.get('A')?.equals(new Fraction(0))).toBe(true);
    expect(result.distances.get('B')?.equals(new Fraction(2))).toBe(true);
  });

  it('should throw an error for an edge with an unknown target node', () => {
    const nodes = [
      { id: 'A' },
      { id: 'B' },
    ];

    const edges = [
      {
        id: 'edge1',
        source: 'A',
        target: 'C',
        weight: new Fraction(1),
      },
    ];

    expect(() => dijkstra(nodes, edges, 'A')).toThrowError(
      'Edge "edge1" references unknown target "C".'
    );
  });
});

describe('property based tests', () => {
    it('previous pointers form a tree', () => {
    fc.assert(
        fc.property(graphArbitrary, ({ nodes, edges }) => {
        const start = nodes[0].id;

        const result = dijkstra(nodes, edges, start);

        for (const node of nodes) {
            const seen = new Set<string>();

            let current: string | null = node.id;

            while (current !== null) {
            expect(seen.has(current)).toBe(false);

            seen.add(current);

            current = result.previous.get(current) ?? null;
            }
        }
        })
    );
    });
  it('previous pointers reconstruct the recorded distance', () => {
    fc.assert(
      fc.property(graphArbitrary, ({ nodes, edges }) => {
        fc.pre(nodes.length > 0);

        const start = nodes[0].id;
        const result = dijkstra(nodes, edges, start);

        const minEdgeMap = new Map<string, Fraction>();
        for (const edge of edges) {
            const key = `${edge.source}->${edge.target}`;
            const existing = minEdgeMap.get(key);
            if (existing === undefined || edge.weight.compare(existing) < 0) {
            minEdgeMap.set(key, edge.weight);
            }
        }

        for (const node of nodes) {
            const distance = result.distances.get(node.id);

            if (distance == null) {
            expect(result.previous.get(node.id)).toBeNull();
            continue;
            }

            let current = node.id;
            let total = new Fraction(0);
            const pathVisited = new Set<string>([current]);

            while (current !== start) {
            const prev = result.previous.get(current);

            expect(prev).not.toBeNull();

            if (pathVisited.has(prev!)) {
                throw new Error(`Cycle detected in 'previous' chain involving node "${prev}"`);
            }
            pathVisited.add(prev!);

            const edgeWeight = minEdgeMap.get(`${prev}->${current}`);

            expect(edgeWeight).toBeDefined();

            total = total.add(edgeWeight!);
            current = prev!;
            }

            expect(total.equals(distance)).toBe(true);
        }
        })
    );
    });
    it('satisfies the triangle inequality', () => {
    fc.assert(
        fc.property(graphArbitrary, ({ nodes, edges }) => {
        const start = nodes[0].id;

        const result = dijkstra(nodes, edges, start);

        for (const edge of edges) {
            const du = result.distances.get(edge.source);
            const dv = result.distances.get(edge.target);

            if (du == null || dv == null) continue;

            expect(
            dv.compare(du.add(edge.weight))
            ).toBeLessThanOrEqual(0);
        }
        })
    );
    });
    it('every previous pointer corresponds to an edge', () => {
    fc.assert(
        fc.property(graphArbitrary, ({ nodes, edges }) => {
        const start = nodes[0].id;

        const result = dijkstra(nodes, edges, start);

        for (const node of nodes) {
            const prev = result.previous.get(node.id);

            if (prev === null) continue;

            expect(
            edges.some(
                edge =>
                edge.source === prev &&
                edge.target === node.id
            )
            ).toBe(true);
          }
        })
      );
    });
  it('never produces a negative distance', () => {
    fc.assert(
        fc.property(graphArbitrary, ({ nodes, edges }) => {
        const start = nodes[0].id;

        const result = dijkstra(nodes, edges, start);

        for (const distance of result.distances.values()) {
            if (distance !== null) {
            expect(distance.compare(0)).toBeGreaterThanOrEqual(0);
            }
        }
        })
      );
    });
  it('distance to the start node is always zero', () => {
    fc.assert(
        fc.property(graphArbitrary, ({ nodes, edges }) => {
        const start = nodes[0].id;

        const result = dijkstra(nodes, edges, start);

        expect(result.distances.get(start)?.equals(new Fraction(0))).toBe(true);
        expect(result.previous.get(start)).toBe(null);
        })
    );
  });
})