import { describe, expect, test } from 'vitest';

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
