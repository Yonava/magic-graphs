import { describe, test } from 'vitest';

// index.ts is still scaffolding, these are the behaviors to cover once it lands

describe('nondeterministicFiniteAutomata', () => {
  test.todo('accepts when any branch ends in an accepting state');
  test.todo('rejects only when every branch fails');
  test.todo('follows epsilon transitions without consuming a symbol');
  test.todo('accepts the empty string when an epsilon path reaches acceptance');
  test.todo('rejects when a branch dies on a missing transition');
  test.todo('accepts the same language as its subset construction dfa');
});
