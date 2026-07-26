import { TraversalFrame } from './frame.ts';
import { TraversalFunction, edgeBetween } from './shared.ts';

const createFrame =
  (visited: Set<string>, stack: string[]) =>
  <T extends TraversalFrame>(fields: T) => ({
    visitedNodeIds: [...visited],
    queuedNodeIds: [...stack],
    ...fields,
  });

export const dfs: TraversalFunction =
  (graph, startNodeId) => (frameCollector) => {
    const adjList = graph.adjacencyLists.standard.value;
    if (!(startNodeId in adjList)) return;

    const visited = new Set<string>();
    const stack = [startNodeId];
    const frame = createFrame(visited, stack);

    frameCollector.add(
      frame({
        type: 'start',
        node: startNodeId,
      }),
    );

    while (stack.length > 0) {
      const node = stack.pop()!;

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
        stack.push(neighbor);

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
