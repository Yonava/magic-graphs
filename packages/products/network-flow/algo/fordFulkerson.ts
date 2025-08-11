import type { GEdge, GNode, Graph } from '@graph/types';
import { getAdjacencyList } from '@graph/useAdjacencyList';

export type FlowTrace = Record<GEdge['id'], number>;

/**
 * implementation of the Ford-Fulkerson algorithm
 */
export const fordFulkerson = (
  graph: Graph,
  {
    sourceId,
    sinkId,
  }: {
    sourceId: GNode['id'];
    sinkId: GNode['id'];
  },
) => {
  const edgeIdToWeight = graph.edges.value.reduce<Record<string, number>>(
    (acc, curr) => {
      acc[curr.id] = Number(curr.label);
      return acc;
    },
    {},
  );

  const trace: FlowTrace[] = [];

  const adjList = getAdjacencyList(graph);

  const dfs = (
    s: GNode['id'],
    t: GNode['id'],
    visited: Set<string> | undefined = undefined,
    path: GNode['id'][] | undefined = undefined,
  ): GNode['id'][] | undefined => {
    if (path === undefined) path = [];
    if (visited === undefined) visited = new Set<string>();

    visited.add(s);
    path.push(s);

    if (s === t) return path;

    const adjacentNodeIds = adjList[s];

    for (const nodeId of adjacentNodeIds) {
      const connectingEdge = graph.edges.value.find(
        (e) => e.from === s && e.to === nodeId,
      );
      if (!connectingEdge) throw 'the adj list must be wrong! (1)';
      const connectingEdgeWeight = edgeIdToWeight[connectingEdge.id];
      if (connectingEdgeWeight > 0 && !visited.has(nodeId)) {
        const resultPath = dfs(nodeId, t, visited, [...path]);
        if (resultPath) return resultPath;
      }
    }

    return undefined;
  };

  const run = () => {
    let maxFlow = 0;

    let path = dfs(sourceId, sinkId);
    while (path) {
      let pathFlow = Infinity;

      for (let i = 0; i < path.length - 1; i++) {
        const u = path[i];
        const v = path[i + 1];
        const connectingEdge = graph.edges.value.find(
          (e) => e.from === u && e.to === v,
        );
        if (!connectingEdge) throw 'the adj list must be wrong! (2)';
        const connectingEdgeWeight = edgeIdToWeight[connectingEdge.id];
        pathFlow = Math.min(pathFlow, connectingEdgeWeight);
      }

      for (let i = 0; i < path.length - 1; i++) {
        const u = path[i];
        const v = path[i + 1];
        const connectingUV = graph.edges.value.find(
          (e) => e.from === u && e.to === v,
        );
        const connectingVU = graph.edges.value.find(
          (e) => e.from === v && e.to === u,
        );
        if (!connectingUV || !connectingVU)
          throw 'the adj list must be wrong! (3)';
        edgeIdToWeight[connectingUV.id] -= pathFlow;
        edgeIdToWeight[connectingVU.id] += pathFlow;
        trace.push({
          [connectingUV.id]: edgeIdToWeight[connectingUV.id],
          [connectingVU.id]: edgeIdToWeight[connectingVU.id],
        });
      }

      maxFlow += pathFlow;
      path = dfs(sourceId, sinkId);
    }

    return maxFlow;
  };

  return {
    maxFlow: run(),
    trace,
  };
};
