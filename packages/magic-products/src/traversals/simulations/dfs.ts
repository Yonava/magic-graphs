import { TraversalFunction, edgeBetween } from './shared.ts';

export const dfs: TraversalFunction =
  (graph, startNodeId) => (frameCollector) => {
    const adjList = graph.adjacencyLists.standard.value;
    if (!(startNodeId in adjList)) return;

    const visited = new Set<string>();
    const stack = [startNodeId];

    frameCollector.add({
      type: 'start',
      node: startNodeId,
      queuedNodeIds: [...stack],
    });

    while (stack.length > 0) {
      const node = stack.pop()!;

      frameCollector.add({
        type: 'explore-node',
        exploredNode: node,
        visitedNodeIds: [...visited],
        queuedNodeIds: [...stack],
      });

      if (visited.has(node)) {
        frameCollector.add({
          type: 'dequeued-node-already-visited',
          node,
          visitedNodeIds: [...visited],
          queuedNodeIds: [...stack],
        });
        continue;
      }

      visited.add(node);

      frameCollector.add({
        type: 'mark-visited',
        node,
        visitedNodeIds: [...visited],
        queuedNodeIds: [...stack],
      });

      const neighbors = adjList[node] ?? [];

      if (neighbors.length > 0) {
        frameCollector.add({
          type: 'travel-edge',
          traveledEdgeIds: neighbors.map((neighbor) =>
            edgeBetween(graph, node, neighbor),
          ),
          visitedNodeIds: [...visited],
          queuedNodeIds: [...stack],
        });
      }

      for (const neighbor of neighbors) {
        if (visited.has(neighbor)) {
          frameCollector.add({
            type: 'previously-visited',
            node: neighbor,
            visitedNodeIds: [...visited],
            queuedNodeIds: [...stack],
          });
          continue;
        }
        stack.push(neighbor);

        frameCollector.add({
          type: 'enqueue-node',
          node: neighbor,
          visitedNodeIds: [...visited],
          queuedNodeIds: [...stack],
        });
      }
    }

    frameCollector.add({
      type: 'end',
      visitedNodeIds: [...visited],
      queuedNodeIds: [...stack],
    });
  };
