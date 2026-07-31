import { describe, test } from 'vitest';

// index.ts is still scaffolding, these are the behaviors to cover once it lands

describe('periodicity', () => {
  test.todo('returns the greatest common divisor of the return cycle lengths');
  test.todo('reports a period of one when the state carries a self-loop');
  test.todo('reports a period of two for a chain that alternates');
  test.todo('gives every state in a communicating class the same period');
  test.todo('handles a state that never returns to itself');
  test.todo('does not mutate the input graph');
});
