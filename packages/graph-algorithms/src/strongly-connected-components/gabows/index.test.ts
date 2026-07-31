import { describe, test } from 'vitest';

// index.ts is still scaffolding, these are the behaviors to cover once it lands

describe('gabows', () => {
  test.todo('groups every mutually reachable set of nodes into one component');
  test.todo('gives a node with no cycle a component of its own');
  test.todo('collapses a cycle spanning both stacks into one component');
  test.todo('handles a graph with several disconnected components');
  test.todo('agrees with tarjans and kosarajus on the same graph');
  test.todo('does not mutate the input graph');
});
