import { describe, test } from 'vitest';

// index.ts is still scaffolding, these are the behaviors to cover once it lands

describe('communicatingClasses', () => {
  test.todo('groups states that reach each other into one class');
  test.todo('places every state in exactly one class');
  test.todo('marks a class with no way out as closed');
  test.todo('marks a class that can be left as transient');
  test.todo('returns one class per state when no state can return');
  test.todo('agrees with the strongly connected components of the chain');
  test.todo('does not mutate the input chain');
});
