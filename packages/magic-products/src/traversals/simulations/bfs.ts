import { TraversalFunction, edgeBetween } from './shared.ts';

export const bfs: TraversalFunction =
  (graph, startNodeId) => (frameCollector) => {
    const adjList = graph.adjacencyLists.standard.value;
    if (!(startNodeId in adjList)) return;

    const visited = new Set<string>();
    const enqueued = new Set<string>([startNodeId]);
    const queue = [startNodeId];

    frameCollector.add({
      type: 'start',
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
        if (enqueued.has(neighbor)) {
          frameCollector.add({
            type: 'previously-visited',
            node: neighbor,
            visitedNodeIds: [...visited],
            queuedNodeIds: [...queue],
          });
          continue;
        }
        enqueued.add(neighbor);
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
      queuedNodeIds: [],
    });
  };
