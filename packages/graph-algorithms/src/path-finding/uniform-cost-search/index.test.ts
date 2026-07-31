import { describe, test } from 'vitest';

// index.ts is still scaffolding, these are the behaviors to cover once it lands

describe('uniformCostSearch', () => {
  test.todo('expands the frontier node with the lowest cumulative cost first');
  test.todo('returns the cheapest path to the goal');
  test.todo('stops when the goal is expanded, not when it is discovered');
  test.todo('returns no path when the goal is unreachable');
  test.todo('agrees with dijkstras on the same weighted graph');
  test.todo('does not mutate the input graph');
});
