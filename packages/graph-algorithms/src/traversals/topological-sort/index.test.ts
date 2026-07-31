import { describe, test } from 'vitest';

// index.ts is still scaffolding, these are the behaviors to cover once it lands

describe('topologicalSort', () => {
  test.todo('orders every node before the nodes it points to');
  test.todo('includes every node exactly once');
  test.todo('handles a graph with several disconnected components');
  test.todo('reports a cycle rather than returning a partial ordering');
  test.todo('returns an empty ordering for an empty graph');
  test.todo('does not mutate the input graph');
});
