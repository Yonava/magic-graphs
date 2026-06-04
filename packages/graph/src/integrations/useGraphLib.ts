import graphlib from 'graphlib';

import { computed } from 'vue';

import { BaseGraph } from '../base/types.ts';

/**
 * a magic graphs integration with the `graphlib` library.
 * ..lib api reference: https://github.com/dagrejs/graphlib/wiki/API-Reference
 */
export const useGraphLib = (graph: BaseGraph) =>
  computed(() => {
    const directed = graph.settings.value.isGraphDirected;
    const graphLibInstance = new graphlib.Graph({
      directed,
      multigraph: true,
    });

    const { nodes, edges } = graph;
    for (const node of nodes.value) graphLibInstance.setNode(node.id);
    for (const edge of edges.value)
      graphLibInstance.setEdge({
        v: edge.from,
        w: edge.to,
        name: edge.id,
      });

    return graphLibInstance;
  });
