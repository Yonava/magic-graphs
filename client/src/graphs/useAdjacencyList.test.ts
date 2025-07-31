import { useGraph } from '@graph/useGraph';
import { describe, expect, test } from 'vitest';

import { ref } from 'vue';

import {
  getAdjacencyList,
  getFullNodeAdjacencyList,
  getLabelAdjacencyList,
} from './useAdjacencyList';

const nodeA = { id: '1', label: 'a', x: 0, y: 0 };
const nodeB = { id: '2', label: 'b', x: 0, y: 0 };
const nodeC = { id: '3', label: 'c', x: 0, y: 0 };

const getGraph = () => {
  const graph = useGraph(ref());

  graph.addNode(nodeA);
  graph.addNode(nodeB);
  graph.addNode(nodeC);

  graph.addEdge({ from: nodeA.id, to: nodeB.id });
  graph.addEdge({ from: nodeB.id, to: nodeC.id });
  graph.addEdge({ from: nodeC.id, to: nodeC.id });

  return graph;
};

describe('adjacency lists', () => {
  test('get adjacency list', () => {
    const graph = getGraph();
    graph.settings.value.isGraphDirected = true;
    const adjacencyList = getAdjacencyList(graph);
    expect(adjacencyList).toEqual({
      [nodeA.id]: [nodeB.id],
      [nodeB.id]: [nodeC.id],
      [nodeC.id]: [nodeC.id],
    });
  });

  test('get adjacency list - undirected', () => {
    const graph = getGraph();
    graph.settings.value.isGraphDirected = false;
    const adjacencyList = getAdjacencyList(graph);
    expect(adjacencyList).toEqual({
      [nodeA.id]: [nodeB.id],
      [nodeB.id]: [nodeA.id, nodeC.id],
      [nodeC.id]: [nodeB.id, nodeC.id],
    });
  });

  test('get label adjacency list', async () => {
    const graph = getGraph();
    graph.settings.value.isGraphDirected = true;
    const adjacencyList = getLabelAdjacencyList(graph);
    expect(adjacencyList).toEqual({
      [nodeA.label]: [nodeB.label],
      [nodeB.label]: [nodeC.label],
      [nodeC.label]: [nodeC.label],
    });
  });

  test('get full node adjacency list', () => {
    const graph = getGraph();
    graph.settings.value.isGraphDirected = true;
    const fullNodeAdjacencyList = getFullNodeAdjacencyList(graph);
    expect(fullNodeAdjacencyList).toEqual({
      [nodeA.id]: [nodeB],
      [nodeB.id]: [nodeC],
      [nodeC.id]: [nodeC],
    });
  });
});
