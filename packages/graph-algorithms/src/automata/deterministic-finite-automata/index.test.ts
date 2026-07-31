import { describe, test } from 'vitest';

// index.ts is still scaffolding, these are the behaviors to cover once it lands

describe('deterministicFiniteAutomata', () => {
  test.todo('accepts a string that ends in an accepting state');
  test.todo('rejects a string that ends in a non accepting state');
  test.todo('accepts the empty string when the start state is accepting');
  test.todo('rejects when a symbol has no transition out of the current state');
  test.todo('rejects a symbol outside the alphabet');
  test.todo('follows exactly one transition per symbol');
});
