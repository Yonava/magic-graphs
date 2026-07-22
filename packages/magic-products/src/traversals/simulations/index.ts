import { useProvidedGraph } from '@magic/shared/product';

import { ref } from 'vue';

import { useBFSSimulationDefinition } from './bfs.ts';
import { useDFSSimulationDefinition } from './dfs.ts';
import { StartNodeId, TraversalSimulationOptions } from './shared.ts';

export const useTraversalSimulations = () => {
  const graph = useProvidedGraph();
  const startNodeId: StartNodeId = ref();

  const options: TraversalSimulationOptions = { graph, startNodeId };
  const bfs = useBFSSimulationDefinition(options);
  const dfs = useDFSSimulationDefinition(options);

  return { bfs, dfs, startNodeId };
};
