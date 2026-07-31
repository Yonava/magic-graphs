import { describe, test } from 'vitest';

// index.ts is still scaffolding, these are the behaviors to cover once it lands

describe('floydWarshalls', () => {
  test.todo('returns the shortest distance between every pair of nodes');
  test.todo('reports a distance of zero from each node to itself');
  test.todo('leaves unreachable pairs at infinity');
  test.todo('handles negative edge weights without a negative cycle');
  test.todo('surfaces a negative cycle as a negative distance on the diagonal');
  test.todo('agrees with bellmanFord run from each node in turn');
  test.todo('does not mutate the input graph');
});
