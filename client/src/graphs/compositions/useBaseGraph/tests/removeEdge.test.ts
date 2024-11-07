import { useBaseGraph } from '..';
import { ref } from 'vue';
import { describe, test, expect } from 'vitest';

describe('base graph - removeEdge', () => {
  const graph = useBaseGraph(ref());

  const node2 = graph.addNode({ x: 1, y: 1 });
  const node1 = graph.addNode({ x: 0, y: 0 });

  test('remove edge', () => {
    graph.edges.value = [];

    const edge = graph.addEdge({ from: node1.id, to: node2.id });
    if (!edge) throw new Error('Edge not created');

    graph.removeEdge(edge.id);
    expect(graph.edges.value).toEqual([]);
  });

  test('remove edge with invalid id', () => {
    graph.edges.value = [];

    const edge = graph.addEdge({ from: node1.id, to: node2.id });
    graph.removeEdge('invalid-id');
    expect(graph.edges.value).toMatchObject([edge]);
  });
});