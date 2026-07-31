import { describe, test } from 'vitest';

// index.ts is still scaffolding, these are the behaviors to cover once it lands

describe('kosarajus', () => {
  test.todo('groups every mutually reachable set of nodes into one component');
  test.todo('gives a node with no cycle a component of its own');
  test.todo('walks the transpose graph on the second pass');
  test.todo('handles a graph with several disconnected components');
  test.todo('agrees with tarjans and gabows on the same graph');
  test.todo('does not mutate the input graph');
});
