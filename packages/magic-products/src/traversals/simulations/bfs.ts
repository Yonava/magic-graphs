import { TraversalFunction, edgeBetween } from './shared.ts';

export const bfs: TraversalFunction =
  (graph, startNodeId) => (frameCollector) => {
    const adjList = graph.adjacencyLists.standard.value;
    if (!(startNodeId in adjList)) return;

    const visited = new Set<string>();
    const queue = [startNodeId];

    frameCollector.add({
      type: 'start',
      node: startNodeId,
      queuedNodeIds: [...queue],
    });

    while (queue.length > 0) {
      const node = queue.shift()!;

      frameCollector.add({
        type: 'explore-node',
        exploredNode: node,
        visitedNodeIds: [...visited],
        queuedNodeIds: [...queue],
      });

      if (visited.has(node)) {
        frameCollector.add({
          type: 'dequeued-node-already-visited',
          node,
          visitedNodeIds: [...visited],
          queuedNodeIds: [...queue],
        });
        continue;
      }

      visited.add(node);

      frameCollector.add({
        type: 'mark-visited',
        node,
        visitedNodeIds: [...visited],
        queuedNodeIds: [...queue],
      });

      const neighbors = adjList[node] ?? [];

      if (neighbors.length > 0) {
        frameCollector.add({
          type: 'travel-edge',
          traveledEdgeIds: neighbors.map((neighbor) =>
            edgeBetween(graph, node, neighbor),
          ),
          visitedNodeIds: [...visited],
          queuedNodeIds: [...queue],
        });
      }

      for (const neighbor of neighbors) {
        if (visited.has(neighbor)) {
          frameCollector.add({
            type: 'previously-visited',
            node: neighbor,
            visitedNodeIds: [...visited],
            queuedNodeIds: [...queue],
          });
          continue;
        }
        queue.push(neighbor);

        frameCollector.add({
          type: 'enqueue-node',
          node: neighbor,
          visitedNodeIds: [...visited],
          queuedNodeIds: [...queue],
        });
      }
    }

    frameCollector.add({
      type: 'end',
      visitedNodeIds: [...visited],
      queuedNodeIds: [...queue],
    });
  };
