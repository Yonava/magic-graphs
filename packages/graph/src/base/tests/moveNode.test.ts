import { describe, expect, test } from 'vitest';

import { ref } from 'vue';

import { useBaseGraph } from '..';

describe('base graph - moveNode', () => {
  const graph = useBaseGraph(ref() as any);

  test('move node', () => {
    graph.nodes.value = [];

    const node1 = graph.addNode({ x: 0, y: 0 });
    const node2 = graph.addNode({ x: 1, y: 1 });

    if (!node1 || !node2) {
      throw new Error('nodes not added');
    }

    graph.moveNode(node1.id, { x: 2, y: 2 });
    graph.moveNode(node2.id, { x: 3, y: 3 });

    expect(graph.nodes.value).toMatchObject([
      { x: 2, y: 2 },
      { x: 3, y: 3 },
    ]);
  });

  test('move node with invalid id', () => {
    graph.nodes.value = [];
    const node = graph.addNode({ x: 1, y: 1 });

    if (!node) {
      throw new Error('node not added');
    }

    graph.moveNode('invalid-id', { x: 2, y: 2 });

    expect(node.x).toEqual(1);
    expect(node.y).toEqual(1);
    expect(graph.nodes.value).toMatchObject([node]);
  });
});
