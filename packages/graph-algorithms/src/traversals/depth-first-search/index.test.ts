import { describe, test } from 'vitest';

// index.ts is implemented, these are the behaviors to cover
// mirroring breadth-first-search/index.test.ts

describe('depthFirstSearch', () => {
  test.todo('visits a path to its end before backtracking');
  test.todo('handles a single node with no neighbors');
  test.todo('only visits nodes reachable from start');
  test.todo('does not revisit nodes in a graph with cycles');
  test.todo('ignores self-loops');
  test.todo('handles neighbors that are not keys in the graph');
  test.todo('records a node the first time it leaves the stack');
  test.todo('does not mutate the input graph');
});
