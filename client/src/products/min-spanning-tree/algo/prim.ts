import type { GEdge, Graph } from "@graph/types";
import { getEdgeWeight } from "@graph/helpers";

export const prim = (graph: Graph) => {
  const { nodes, edges } = graph;

  const getMinEdge = (edges: GEdge[], inMST: Set<string>) => {
    let minEdge: GEdge | null = null;

    for (const edge of edges) {
      if (
        (inMST.has(edge.from) && !inMST.has(edge.to)) ||
        (inMST.has(edge.to) && !inMST.has(edge.from))
      ) {
        if (!minEdge) minEdge = edge;
        const minEdgeCost = getEdgeWeight(minEdge, graph);
        const edgeCost = getEdgeWeight(edge, graph);
        if (edgeCost < minEdgeCost) minEdge = edge;
      }
    }

    return minEdge;
  };

  const run = () => {
    if (nodes.value.length === 0) return [];

    const mst: GEdge[] = [];
    const inMST = new Set<string>();

    const startNode = nodes.value[0].id;
    inMST.add(startNode);

    const allEdges = Object.values(edges.value);

    while (mst.length < nodes.value.length - 1) {
      const minEdge = getMinEdge(allEdges, inMST);

      if (!minEdge) {
        break;
      }

      mst.push(minEdge);
      inMST.add(minEdge.from);
      inMST.add(minEdge.to);
    }

    return mst;
  };

  return run();
}
