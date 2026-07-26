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
      frameCollector.add({
        type: 'explore-node',
        exploredNode: node,
        visitedNodeIds: [...visited],
      });

      // arriving at a node visits it. marking on the way in rather than on the
      // way back up is also what keeps the recursion from running away on a cycle
      visited.add(node);

      frameCollector.add({
        type: 'mark-visited',
        node,
        visitedNodeIds: [...visited],
      });

      for (const neighbor of adjList[node] ?? []) {
        // one edge per frame, unlike bfs: a depth first search commits to the
        // edge it is looking at before it considers the next one
        frameCollector.add({
          type: 'travel-edge',
          traveledEdgeIds: [edgeBetween(graph, node, neighbor)],
          exploredNode: node,
          visitedNodeIds: [...visited],
        });

        // checked here rather than at the top of visit so the frame can name
        // the neighbor being skipped
        if (visited.has(neighbor)) {
          frameCollector.add({
            type: 'previously-visited',
            node: neighbor,
            visitedNodeIds: [...visited],
          });
          continue;
        }

        visit(neighbor);
      }
    };

    visit(startNodeId);

    frameCollector.add({
      type: 'end',
      visitedNodeIds: [...visited],
    });
  };
