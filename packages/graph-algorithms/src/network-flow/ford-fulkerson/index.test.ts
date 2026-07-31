import { describe, test } from 'vitest';

// index.ts is still scaffolding, these are the behaviors to cover once it lands

describe('fordFulkerson', () => {
  test.todo('returns the maximum flow from source to sink');
  test.todo('never sends more flow along an edge than its capacity');
  test.todo('conserves flow at every node other than source and sink');
  test.todo('pushes flow back along a residual edge when that frees capacity');
  test.todo('returns zero flow when the sink is unreachable');
  test.todo('matches the capacity of the minimum cut');
  test.todo('does not mutate the input graph');
});
