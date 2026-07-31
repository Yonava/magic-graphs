import { describe, test } from 'vitest';

// index.ts is still scaffolding, these are the behaviors to cover once it lands

describe('pageRank', () => {
  test.todo('returns ranks that sum to one');
  test.todo('ranks a node above its peers when more nodes link to it');
  test.todo('spreads the rank of a dangling node across the whole graph');
  test.todo('gives every node the same rank on a symmetric graph');
  test.todo('converges once the ranks stop moving by more than the tolerance');
  test.todo('flattens toward a uniform distribution as damping falls');
  test.todo('does not mutate the input graph');
});
