import fc from 'fast-check';
import { describe, expect, test } from 'vitest';

import {
  distances,
  graphArbitrary,
  reachableNodes,
} from '../graphGenerator.ts';
import { breadthFirstSearch } from './index.ts';

describe(breadthFirstSearch, () => {
  test('visits all reachable nodes in level order', () => {
    const graph = {
      A: ['B', 'C'],
      B: ['D'],
      C: ['D'],
      D: [],
    };
    expect(breadthFirstSearch(graph, 'A')).toEqual(['A', 'B', 'C', 'D']);
  });

  test('handles a single node with no neighbors', () => {
    expect(breadthFirstSearch({ A: [] }, 'A')).toEqual(['A']);
  });

  test('returns empty array when start node is not in graph', () => {
    expect(breadthFirstSearch({ A: [] }, 'Z')).toEqual([]);
  });

  test('does not revisit nodes in a graph with cycles', () => {
    const graph = {
      A: ['B'],
      B: ['C'],
      C: ['A'],
    };
    expect(breadthFirstSearch(graph, 'A')).toEqual(['A', 'B', 'C']);
  });

  test('only visits nodes reachable from start', () => {
    const graph = {
      A: ['B'],
      B: [],
      C: ['D'],
      D: [],
    };
    expect(breadthFirstSearch(graph, 'A')).toEqual(['A', 'B']);
  });
});

describe('properties', () => {
  test('only visits reachable nodes', () => {
    fc.assert(
      fc.property(graphArbitrary, (graph) => {
        const start = Object.keys(graph)[0];

        const result = breadthFirstSearch(graph, start);

        expect(new Set(result)).toEqual(reachableNodes(graph, start));
      }),
      { numRuns: 10 },
    );
  });

  test('never visits the same node twice', () => {
    fc.assert(
      fc.property(graphArbitrary, (graph) => {
        const start = Object.keys(graph)[0];

        const result = breadthFirstSearch(graph, start);

        expect(new Set(result).size).toBe(result.length);
      }),
      { numRuns: 10 },
    );
  });

  test('always starts at the starting node', () => {
    fc.assert(
      fc.property(graphArbitrary, (graph) => {
        const start = Object.keys(graph)[0];

        expect(breadthFirstSearch(graph, start)[0]).toBe(start);
      }),
      { numRuns: 10 },
    );
  });

  test('maintains BFS level ordering', () => {
    fc.assert(
      fc.property(graphArbitrary, (graph) => {
        const start = Object.keys(graph)[0];

        const result = breadthFirstSearch(graph, start);

        const nodeDistances = distances(graph, start);

        const resultDistances = result.map((node) => nodeDistances.get(node)!);

        expect(resultDistances).toEqual(
          [...resultDistances].sort((a, b) => a - b),
        );
      }),
      { numRuns: 10 },
    );
  });

  test('returns empty array for missing start nodes', () => {
    fc.assert(
      fc.property(graphArbitrary, (graph) => {
        const missing = 'Z';

        if (!(missing in graph)) {
          expect(breadthFirstSearch(graph, missing)).toEqual([]);
        }
      }),
    );
  });
});
