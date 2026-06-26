import { AdjacencyList } from '@magic/graph-plugins/adjacency-lists/types';

import type { BasicSearchTrace } from './types.ts';

export const bfs = (adjList: AdjacencyList, startNode: string) => {
  const trace: BasicSearchTrace[] = [];

  const runBfs = () => {
    trace.push({
      visited: new Set(),
      queue: [],
    });

    const visited = new Set<string>();
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
