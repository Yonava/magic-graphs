import { AdjacencyList } from '@magic/graph-plugins/adjacency-lists/types';

import type { BasicSearchTrace } from './types.ts';

export const dfs = (adjList: AdjacencyList, startNode: string) => {
  const trace: BasicSearchTrace[] = [];

  const runDfs = (currentNode: string, visited: Set<string>) => {
    visited.add(currentNode);

    trace.push({
      currentNodeId: currentNode,
      visited: new Set(visited),
    });

    for (const neighbor of adjList[currentNode]) {
      if (!visited.has(neighbor)) {
        runDfs(neighbor, visited);
      }
    }
  };

  runDfs(startNode, new Set());

  return trace;
};
