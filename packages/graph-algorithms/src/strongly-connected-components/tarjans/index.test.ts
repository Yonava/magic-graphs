import { describe, test } from 'vitest';

// index.ts is still scaffolding, these are the behaviors to cover once it lands

describe('tarjans', () => {
  test.todo('groups every mutually reachable set of nodes into one component');
  test.todo('gives a node with no cycle a component of its own');
  test.todo('treats a self-loop as a single node component');
  test.todo('emits components in reverse topological order');
  test.todo('finds every component in a single pass');
  test.todo('handles a graph with several disconnected components');
  test.todo('agrees with kosarajus and gabows on the same graph');
  test.todo('does not mutate the input graph');
});
