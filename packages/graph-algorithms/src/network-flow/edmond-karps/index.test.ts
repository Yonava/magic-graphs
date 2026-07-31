import { describe, test } from 'vitest';

// index.ts is still scaffolding, these are the behaviors to cover once it lands

describe('edmondKarps', () => {
  test.todo('returns the maximum flow from source to sink');
  test.todo('picks the augmenting path with the fewest edges each round');
  test.todo('never sends more flow along an edge than its capacity');
  test.todo('conserves flow at every node other than source and sink');
  test.todo('returns zero flow when the sink is unreachable');
  test.todo('agrees with fordFulkerson on the same network');
  test.todo('does not mutate the input graph');
});
