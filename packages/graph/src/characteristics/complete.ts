import { computed } from 'vue';

import { GraphCoreControls } from '../core/types.ts';

export const useComplete = (
  graph: Pick<GraphCoreControls, 'settings' | 'nodes' | 'edges'>,
) => {
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
