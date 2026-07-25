import { useProvidedGraph } from '@magic/shared/product';

import { computed } from 'vue';

import { TraversalFrame } from '../frame.ts';

/**
 * the frame the playhead is parked on, or undefined when nothing is running.
 * these components mount through the traversal lens, so a missing simulation
 * only happens on the frame where the lens is being torn down
 */
export const useCurrentFrame = () => {
  const graph = useProvidedGraph();

  const currentFrame = computed<TraversalFrame | undefined>(() => {
    const simulation = graph.magic.simulation.current.value;
    if (!simulation) return;
    return simulation.frames[simulation.playhead.position];
  });

  return { graph, currentFrame };
};
