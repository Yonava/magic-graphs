import type { BaseGraph } from '@graph/base';

import { computed } from 'vue';

export const useComplete = (graph: BaseGraph) => {
  const isComplete = computed(() => {
    const isDirected = graph.settings.value.isGraphDirected;
    const n = graph.nodes.value.length;
    const m = graph.edges.value.length;
    return m === (isDirected ? n * (n - 1) : (n * (n - 1)) / 2);
  });

  return {
    isComplete,
  };
};
