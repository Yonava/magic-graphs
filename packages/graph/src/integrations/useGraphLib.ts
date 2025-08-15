import type { Graph } from '../types';
import graphlib from 'graphlib';

import { computed } from 'vue';

/**
 * a magic graphs integration with the `graphlib` library.
 * ..lib api reference: https://github.com/dagrejs/graphlib/wiki/API-Reference
 */
export const useGraphLib = (graph: Graph) =>
  computed(() => {
    const directed = graph.settings.value.isGraphDirected;
    const g = new graphlib.Graph({
      directed,
      multigraph: true,
    });

    const { nodes, edges } = graph;
    for (const node of nodes.value) g.setNode(node.id);
    for (const edge of edges.value)
      g.setEdge({
        v: edge.from,
        w: edge.to,
        name: edge.id,
      });

    return g;
  });
