import { useProvidedGraph } from '@magic/shared/product';

import { computed } from 'vue';

export const useCurrentFrame = <Frame = any>() => {
  const graph = useProvidedGraph();

  return computed(() => {
    const simulation = graph.magic.simulation.current.value;
    if (!simulation) return;
    return simulation.frames[simulation.playhead.position];
  });
};
