import Fraction from 'fraction.js';

import type { Edge, Node } from '../types.ts';

export const prims = (nodes: Node[], edges: Edge[]) => {
  const getMinEdge = (edges: Edge[], inMST: Set<string>) => {
    let minEdge: Edge | null = null;

    for (const edge of edges) {
      const connectsMST =
        (inMST.has(edge.source) && !inMST.has(edge.target)) ||
        (inMST.has(edge.target) && !inMST.has(edge.source));

      if (!connectsMST) continue;

      if (!minEdge || edge.weight.compare(minEdge.weight) < 0) {
        minEdge = edge;
      }
    }

    return minEdge;
  };

  if (nodes.length === 0) {
    return {
      edges: [],
      totalWeight: new Fraction(0),
      connected: false,
    };
  }

  const mst: Edge[] = [];
  const inMST = new Set<string>();

  for (const node of nodes) {
    if (inMST.has(node.id)) continue;

    inMST.add(node.id);

    while (true) {
      const minEdge = getMinEdge(edges, inMST);

      if (!minEdge) break;

      mst.push(minEdge);

      const newNode = inMST.has(minEdge.source)
        ? minEdge.target
        : minEdge.source;

      inMST.add(newNode);
    }
  }

  return {
    edges: mst,
    totalWeight: mst.reduce(
      (sum, edge) => sum.add(edge.weight),
      new Fraction(0),
    ),
    connected: mst.length === nodes.length - 1,
  };
};
