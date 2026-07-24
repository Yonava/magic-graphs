import { TraversalFunction, edgeBetween } from './shared.ts';

export const dfs: TraversalFunction =
  (graph, startNodeId) => (frameCollector) => {
    const adjList = graph.adjacencyLists.standard.value;
    if (!(startNodeId in adjList)) return;

    const visited = new Set<string>();

    frameCollector.add({
      type: 'start',
      visitedNodeIds: [],
    });

    const visit = (node: string) => {
      if (visited.has(node)) return;
      // arriving at a node visits it. marking here rather than on the way back
      // up is also what keeps the recursion from running away on a cycle
      visited.add(node);

      frameCollector.add({
        type: 'explore-node',
        currentNodeId: node,
        visitedNodeIds: [...visited],
      });

      for (const neighbor of adjList[node] ?? []) {
        frameCollector.add({
          type: 'travel-edge',
          traveledEdgeId: edgeBetween(graph, node, neighbor),
          currentNodeId: node,
          visitedNodeIds: [...visited],
        });
        visit(neighbor);
      }
    };

    visit(startNodeId);

    frameCollector.add({
      type: 'end',
      visitedNodeIds: [...visited],
    });
  };
