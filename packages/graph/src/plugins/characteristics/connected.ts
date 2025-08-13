import type { AdjacencyList, AdjacencyLists } from '../../useAdjacencyList';

import { computed } from 'vue';

export const useConnected = ({
  adjacencyList: adjList,
  undirectedAdjacencyList: undirectedAdjList,
}: Pick<AdjacencyLists, 'adjacencyList' | 'undirectedAdjacencyList'>) => {
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
    return getIsConnectedWithAdjList(adjList.value);
  });

  const isWeaklyConnected = computed(() => {
    return getIsConnectedWithAdjList(undirectedAdjList.value);
  });

  return {
    isConnected,
    isWeaklyConnected,
  };
};

export type CharacteristicConnected = ReturnType<typeof useConnected>;
