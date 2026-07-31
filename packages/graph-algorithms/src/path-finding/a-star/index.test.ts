import { describe, test } from 'vitest';

// index.ts is still scaffolding, these are the behaviors to cover once it lands

describe('aStar', () => {
  test.todo('finds the shortest path under an admissible heuristic');
  test.todo('matches uniform cost search when the heuristic is always zero');
  test.todo('returns no path when the goal is unreachable');
  test.todo('handles a start node that is already the goal');
  test.todo('expands fewer nodes than dijkstras given a good heuristic');
  test.todo('does not mutate the input graph');
});
