import { describe, expect, test } from 'vitest';

import { ref } from 'vue';

import {
  getAdjacencyList,
  getFullNodeAdjacencyList,
  getLabelAdjacencyList,
} from './useAdjacencyList.ts';
import { useGraph } from './useGraph.ts';

const nodeA = { id: '1', label: 'a', x: 0, y: 0 };
const nodeB = { id: '2', label: 'b', x: 0, y: 0 };
const nodeC = { id: '3', label: 'c', x: 0, y: 0 };

const getGraph = () => {
  const graph = useGraph(ref() as any);

  graph.actions.addNode(nodeA);
  graph.actions.addNode(nodeB);
  graph.actions.addNode(nodeC);

  graph.actions.addEdge({ source: nodeA.id, target: nodeB.id });
  graph.actions.addEdge({ source: nodeB.id, target: nodeC.id });
  graph.actions.addEdge({ source: nodeC.id, target: nodeC.id });

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
