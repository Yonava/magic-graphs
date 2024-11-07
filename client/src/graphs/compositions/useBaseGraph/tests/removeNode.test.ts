import { useBaseGraph } from '..';
import { ref } from 'vue';
import { describe, test, expect } from 'vitest';

describe('base graph - removeNode', () => {
  const graph = useBaseGraph(ref());

  test('remove node', () => {
    graph.nodes.value = [];
    const node1 = graph.addNode({
      x: 0,
      y: 0
    });
    const node2 = graph.addNode({
      x: 1,
      y: 1
    });
    graph.removeNode(node1.id);
    expect(graph.nodes.value).toMatchObject([node2]);
  });

  test('remove node with invalid id', () => {
    graph.nodes.value = [];
    const node = graph.addNode({
      x: 1,
      y: 1
    });
    graph.removeNode('invalid-id');
    expect(graph.nodes.value).toMatchObject([node]);
  });

  test('remove node with edges', () => {
    graph.nodes.value = [];
    const node1 = graph.addNode({ x: 0, y: 0 });
    const node2 = graph.addNode({ x: 1, y: 1 });

    graph.addEdge({ from: node1.id, to: node2.id });
    graph.addEdge({ from: node2.id, to: node1.id });
    graph.addEdge({ from: node1.id, to: node1.id });

    graph.removeNode(node1.id);
    expect(graph.nodes.value).toMatchObject([node2]);
    expect(graph.edges.value).toEqual([]);
  })
});