import type { GEdge } from '@magic/graph/types';

import type { Graph } from '../../shared/useGraphWithCanvas.ts';

export const prim = (graph: Graph) => {
  const { nodes, edges } = graph;

  const getMinEdge = (edges: GEdge[], inMST: Set<string>) => {
    let minEdge: GEdge | null = null;

    for (const edge of edges) {
      if (
        (inMST.has(edge.source) && !inMST.has(edge.target)) ||
        (inMST.has(edge.target) && !inMST.has(edge.source))
      ) {
        if (!minEdge) minEdge = edge;
        const minEdgeCost = graph.helpers.edges.getWeight(minEdge.id);
        const edgeCost = graph.helpers.edges.getWeight(edge.id);
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
      inMST.add(minEdge.source);
      inMST.add(minEdge.target);
    }

    return mst;
  };

  return run();
};
