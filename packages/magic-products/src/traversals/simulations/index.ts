import { MagicGraph } from '@magic/shared/product/useGraphProduct';
import { useProvidedMagicGraph } from '@magic/shared/product/useProvidedGraph';

import { ref } from 'vue';

import { bfs } from './bfs.ts';
import { dfs } from './dfs.ts';
import { StartNodeId, traversalSimulationDefinition } from './shared.ts';

export type TraversalSimulationOptions = {
  graph: MagicGraph;
  startNodeId: StartNodeId;
};

export const useTraversalSimulations = () => {
  const graph = useProvidedMagicGraph();
  const startNodeId: StartNodeId = ref();
  const options: TraversalSimulationOptions = { graph, startNodeId };

  return {
    bfs: traversalSimulationDefinition(bfs, options),
    dfs: traversalSimulationDefinition(dfs, options),
    startNodeId,
  };
};
