import { TraversalFunction } from './shared.ts';

export const bfs: TraversalFunction =
  (graph, startNodeId) => (frameCollector) => {
    const adjList = graph.adjacencyLists.standard.value;
    if (!(startNodeId in adjList)) return;

    const visited = new Set<string>([startNodeId]);
    const queue = [startNodeId];

    while (queue.length > 0) {
      const node = queue.shift()!;
      for (const neighbor of adjList[node] ?? []) {
        if (visited.has(neighbor)) continue;
        frameCollector.add({
          currentNodeId: node,
          visitedNodeIds: [...visited],
        });
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  };
