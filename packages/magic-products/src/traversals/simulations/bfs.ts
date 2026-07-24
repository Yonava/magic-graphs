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
      visitedNodeIds: [],
      queuedNodeIds: [...queue],
    });

    while (queue.length > 0) {
      const node = queue.shift()!;
      // arriving at a node visits it
      visited.add(node);

      frameCollector.add({
        type: 'dequeue-node',
        currentNodeId: node,
        visitedNodeIds: [...visited],
        queuedNodeIds: [...queue],
      });

      for (const neighbor of adjList[node] ?? []) {
        frameCollector.add({
          type: 'travel-edge',
          traveledEdgeId: edgeBetween(graph, node, neighbor),
          currentNodeId: node,
          visitedNodeIds: [...visited],
          queuedNodeIds: [...queue],
        });

        // the edge is crossed before this check rather than after, so the
        // frames read as "look down this edge, then decide" instead of silently
        // skipping edges that lead somewhere already queued
        if (enqueued.has(neighbor)) continue;
        enqueued.add(neighbor);
        queue.push(neighbor);

        frameCollector.add({
          type: 'enqueue-node',
          currentNodeId: node,
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
