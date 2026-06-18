import { ComputedRef, computed } from 'vue';

import { AdjacencyList } from '../adjacency-lists/types.ts';
import { Controls } from './index.ts';

export type ConnectedControls = {
  isConnected: ComputedRef<boolean>;
  isWeaklyConnected: ComputedRef<boolean>;
};

export const useConnected = (controls: Controls): ConnectedControls => {
  const { adjacencyLists } = controls;

  const runBFS = (adjList: AdjacencyList, startNode: string) => {
    const visited = new Set<string>();
    const q = [];

    q.push(startNode);

    while (q.length > 0) {
      const node = q.shift();
      if (!node) break;
      visited.add(node);
      const neighbors = adjList[node];
      neighbors.forEach((neighbor) => {
        if (!visited.has(neighbor)) {
          q.push(neighbor);
        }
      });
    }

    return visited;
  };

  const getIsConnectedWithAdjList = (adjList: AdjacencyList) =>
    Object.keys(adjList).every((nodeId) => {
      const visited = runBFS(adjList, nodeId);
      return visited.size === Object.keys(adjList).length;
    });

  const isConnected = computed(() => {
    return getIsConnectedWithAdjList(adjacencyLists.standard.value);
  });

  const isWeaklyConnected = computed(() => {
    return getIsConnectedWithAdjList(adjacencyLists.undirected.value);
  });

  return {
    isConnected,
    isWeaklyConnected,
  };
};
