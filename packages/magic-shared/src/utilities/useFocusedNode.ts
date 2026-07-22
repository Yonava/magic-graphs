import { computed } from 'vue';

import { GNode, Graph } from '../graph/types.ts';

export const useFocusedNode = (graph: Graph) =>
  computed<GNode | undefined>(() => {
    const focusedNodes = graph.focus.focusedNodes.value;
    if (focusedNodes.length !== 1) return;
    return graph.getNode(focusedNodes[0].id);
  });
