import { nullThrows } from '@core/utils/assert';

import { computed } from 'vue';

import { useProvidedGraph } from '../product/useProvidedGraph.ts';

export const useRunningSimulation = () => {
  const graph = useProvidedGraph();

  const simulation = computed(() =>
    nullThrows(
      graph.magic.simulation.current.value,
      'no actively running simulation!',
    ),
  );

  const violation = computed(() => simulation.value.violation);

  const explainer = computed(() =>
    simulation.value.explainer?.(
      simulation.value.frames[simulation.value.playhead.position],
    ),
  );

  return {
    simulation,
    violation,
    explainer,
  };
};
