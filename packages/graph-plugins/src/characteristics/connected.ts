import { DeepReadonly } from 'ts-essentials';

import { AdjacencyList } from '../adjacency-lists/types.ts';
import { Controls } from './index.ts';

export type ConnectedData = {
  isConnected: boolean;
  isWeaklyConnected: boolean;
};

export const getConnectedData = (controls: Controls): ConnectedData => {
  const { adjacencyLists } = controls;

  const bfs = (adjList: DeepReadonly<AdjacencyList>, startNode: string) => {
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
      const visited = bfs(adjList, nodeId);
      return visited.size === Object.keys(adjList).length;
    });

  return {
    isConnected: getIsConnectedWithAdjList(adjacencyLists.standard()),
    isWeaklyConnected: getIsConnectedWithAdjList(adjacencyLists.undirected()),
  };
};
