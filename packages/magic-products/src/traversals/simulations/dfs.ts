import { TraversalFunction } from './shared.ts';

export const dfs: TraversalFunction = (graph, start) => (frameCollector) => {
  const adjList = graph.adjacencyLists.standard.value;
  if (!(start in adjList)) return;

  const visited = new Set<string>();

  const visit = (node: string) => {
    if (visited.has(node)) return;
    frameCollector.add({
      currentNodeId: node,
      visitedNodeIds: [...visited],
    });
    visited.add(node);
    for (const neighbor of adjList[node] ?? []) {
      visit(neighbor);
    }
  };

  visit(start);
};
