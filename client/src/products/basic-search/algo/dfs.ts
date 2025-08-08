import type { GNode } from '@graph/types';
import type { AdjacencyList } from '@graph/useAdjacencyList';

import type { BasicSearchTrace } from './types';

export const dfs = (adjList: AdjacencyList, startNode: GNode['id']) => {
  const trace: BasicSearchTrace[] = [];

  const runDfs = (currentNode: GNode['id'], visited: Set<GNode['id']>) => {
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
