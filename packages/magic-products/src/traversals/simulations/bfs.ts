import { TraversalFrame } from './frame.ts';
import { TraversalFunction, edgeBetween } from './shared.ts';

const createFrame =
  (visited: Set<string>, queue: string[]) =>
  <T extends TraversalFrame>(fields: T) => ({
    visitedNodeIds: [...visited],
    queuedNodeIds: [...queue],
    ...fields,
  });

export const bfs: TraversalFunction =
  (graph, startNodeId) => (frameCollector) => {
    const adjList = graph.adjacencyLists.standard.value;
    if (!(startNodeId in adjList)) return;

    const visited = new Set<string>();
    const queue = [startNodeId];
    const frame = createFrame(visited, queue);

    frameCollector.add(
      frame({
        type: 'start',
        node: startNodeId,
      }),
    );

    while (queue.length > 0) {
      const node = queue.shift()!;

      frameCollector.add(
        frame({
          type: 'explore-node',
          exploredNode: node,
        }),
      );

      if (visited.has(node)) {
        frameCollector.add(
          frame({
            type: 'dequeued-node-already-visited',
            node,
          }),
        );
        continue;
      }

      visited.add(node);

      frameCollector.add(
        frame({
          type: 'mark-visited',
          node,
        }),
      );

      const neighbors = adjList[node] ?? [];

      if (neighbors.length > 0) {
        frameCollector.add(
          frame({
            type: 'travel-edge',
            traveledEdgeIds: neighbors.map((neighbor) =>
              edgeBetween(graph, node, neighbor),
            ),
          }),
        );
      }

      for (const neighbor of neighbors) {
        if (visited.has(neighbor)) {
          frameCollector.add(
            frame({
              type: 'previously-visited',
              node: neighbor,
            }),
          );
          continue;
        }
        queue.push(neighbor);

        frameCollector.add(
          frame({
            type: 'enqueue-node',
            node: neighbor,
          }),
        );
      }
    }

    frameCollector.add(frame({ type: 'end' }));
  };
