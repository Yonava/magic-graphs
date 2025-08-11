import { describe, expect, test } from 'vitest';

import { ref } from 'vue';

import { useBaseGraph } from '..';

describe('base graph - addNode', () => {
  const graph = useBaseGraph(ref());

  test('adds nodes with label defaults', () => {
    graph.nodes.value = [];
    graph.addNode({ x: 0, y: 0 });
    graph.addNode({ x: 1, y: 1 });
    graph.addNode({ x: 2, y: 2 });
    expect(graph.nodes.value).toMatchObject([
      { x: 0, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 2 },
    ]);
  });
});
