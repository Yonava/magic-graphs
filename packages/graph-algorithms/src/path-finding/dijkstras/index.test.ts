import { describe, test } from 'vitest';

// index.ts is still scaffolding, these are the behaviors to cover once it lands

describe('dijkstras', () => {
  test.todo('returns the shortest distance to every reachable node');
  test.todo('leaves unreachable nodes at infinity');
  test.todo('reconstructs the path taken to each node');
  test.todo('prefers a longer hop count when it carries a lower total weight');
  test.todo('handles zero weight edges');
  test.todo('handles a graph with a single node');
  test.todo('does not mutate the input graph');
});
