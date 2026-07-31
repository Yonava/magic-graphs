import { describe, test } from 'vitest';

// index.ts is still scaffolding, these are the behaviors to cover once it lands

describe('epsilonClosure', () => {
  test.todo('includes the state it was given');
  test.todo('follows a chain of epsilon transitions to the end');
  test.todo('terminates on a cycle of epsilon transitions');
  test.todo('ignores transitions that consume a symbol');
  test.todo('returns the union of the closures when given a set of states');
  test.todo('returns only the state itself when it has no epsilon transitions');
});
