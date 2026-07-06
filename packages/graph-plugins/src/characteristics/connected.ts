import { DeepReadonly } from 'ts-essentials';

import { ComputedRef, computed } from 'vue';

import { AdjacencyList } from '../adjacency-lists/types.ts';
import { Controls } from './index.ts';

export type ConnectedControls = {
  isConnected: ComputedRef<boolean>;
  isWeaklyConnected: ComputedRef<boolean>;
};

export const useConnected = (controls: Controls): ConnectedControls => {
  const { adjacencyLists } = controls;

  const runBFS = (adjList: DeepReadonly<AdjacencyList>, startNode: string) => {
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

  const getIsConnectedWithAdjList = (adjList: DeepReadonly<AdjacencyList>) =>
    Object.keys(adjList).every((nodeId) => {
      const visited = runBFS(adjList, nodeId);
      return visited.size === Object.keys(adjList).length;
    });

  const isConnected = computed(() => {
    return getIsConnectedWithAdjList(adjacencyLists.standard());
  });

  const isWeaklyConnected = computed(() => {
    return getIsConnectedWithAdjList(adjacencyLists.undirected());
  });

  return {
    isConnected,
    isWeaklyConnected,
  };
};
