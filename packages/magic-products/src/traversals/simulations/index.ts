import { GNode } from '@magic/shared/graph';
import { useProvidedGraph } from '@magic/shared/product';

import { ref } from 'vue';

import { useBFSSimulationDefinition } from './bfs.ts';
import { useDFSSimulationDefinition } from './dfs.ts';
import { StartNodeId } from './types.ts';

export const useTraversalSimulations = () => {
  const graph = useProvidedGraph();
  const startNodeId: StartNodeId = ref<GNode['id'] | undefined>();

  const bfs = useBFSSimulationDefinition(graph, startNodeId);
  const dfs = useDFSSimulationDefinition(graph, startNodeId);

  return { bfs, dfs, startNodeId };
};
