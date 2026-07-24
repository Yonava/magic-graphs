import { useProvidedGraph } from '@magic/shared/product';
import { MagicGraph } from '@magic/shared/product/useGraphProduct';

import { ref } from 'vue';

import { bfs } from './bfs.ts';
import { dfs } from './dfs.ts';
import { StartNodeId, traversalSimulationDefinition } from './shared.ts';

export type TraversalSimulationOptions = {
  graph: MagicGraph;
  startNodeId: StartNodeId;
};

export const useTraversalSimulations = () => {
  const graph = useProvidedGraph();
  const startNodeId: StartNodeId = ref();
  const options: TraversalSimulationOptions = { graph, startNodeId };

  return {
    bfs: traversalSimulationDefinition(bfs, options),
    dfs: traversalSimulationDefinition(dfs, options),
    startNodeId,
  };
};
