import type { GNode } from '@graph/types';
import type { AdjacencyList } from '@graph/useAdjacencyList';

import type { BasicSearchTrace } from './types';

export const bfs = (adjList: AdjacencyList, startNode: GNode['id']) => {
  const trace: BasicSearchTrace[] = [];

  const runBfs = () => {
    trace.push({
      visited: new Set(),
      queue: [],
    });

    const visited = new Set<GNode['id']>();
    const queue = [startNode];

    trace.push({
      visited: new Set(),
      queue: [...queue],
    });

    while (queue.length > 0) {
      const currentNode = queue.shift()!;
      if (visited.has(currentNode)) continue;
      visited.add(currentNode);

      for (const neighbor of adjList[currentNode]) {
        queue.push(neighbor);
      }

      trace.push({
        currentNodeId: currentNode,
        visited: new Set(visited),
        queue: [...queue],
      });
    }

    trace.push({
      visited: new Set(visited),
      queue,
    });
  };

  runBfs();
  return trace;
};
