import { useProvidedGraph } from '@magic/shared/product';

import { ref } from 'vue';

import { prims } from './prims.ts';
import { StartNodeId, primsSimulationDefinition } from './shared.ts';

export const usePrimsSimulation = () => {
  const graph = useProvidedGraph();
  const startNodeId: StartNodeId = ref();

  return {
    prims: primsSimulationDefinition(prims, { graph, startNodeId }),
    startNodeId,
  };
};
