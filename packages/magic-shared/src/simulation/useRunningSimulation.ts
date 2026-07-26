import { nullThrows } from '@core/utils/assert';

import { computed } from 'vue';

import { useProvidedGraph } from '../product/useProvidedGraph.ts';
import { useCurrentFrame } from './useCurrentFrame.ts';

export const useRunningSimulation = () => {
  const graph = useProvidedGraph();

  const simulation = computed(() =>
    nullThrows(
      graph.magic.simulation.current.value,
      'no actively running simulation!',
    ),
  );

  const violation = computed(() => simulation.value.violation);

  const currentFrame = useCurrentFrame();
  const explainer = computed(() => simulation.value.explainer?.(currentFrame));

  return {
    simulation,
    violation,
    explainer,
  };
};
