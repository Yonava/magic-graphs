import { describe, test } from 'vitest';

// index.ts is still scaffolding, these are the behaviors to cover once it lands

describe('bellmanFord', () => {
  test.todo('returns the shortest distance to every reachable node');
  test.todo('handles negative edge weights');
  test.todo('reports a negative cycle instead of returning distances');
  test.todo('leaves unreachable nodes at infinity');
  test.todo('agrees with dijkstras when every weight is non negative');
  test.todo('settles within one relaxation pass per node less one');
  test.todo('does not mutate the input graph');
});
