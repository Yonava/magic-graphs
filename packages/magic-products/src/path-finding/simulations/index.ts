import { useProvidedGraph } from '@magic/shared/product';
import { MagicGraph } from '@magic/shared/product/useGraphProduct';

import { ref } from 'vue';

import { bellmanFord } from './bellman-ford.ts';
import { dijkstras } from './dijkstras.ts';
import { floydWarshall } from './floyd-warshall.ts';
import {
  SourceNodeId,
  allPairsSimulationDefinition,
  singleSourceSimulationDefinition,
} from './shared.ts';

export type PathFindingSimulationOptions = {
  graph: MagicGraph;
  sourceNodeId: SourceNodeId;
};

export const usePathFindingSimulations = () => {
  const graph = useProvidedGraph();
  const sourceNodeId: SourceNodeId = ref();
  const options: PathFindingSimulationOptions = { graph, sourceNodeId };

  return {
    dijkstras: singleSourceSimulationDefinition(dijkstras, options),
    bellmanFord: singleSourceSimulationDefinition(bellmanFord, options),
    floydWarshall: allPairsSimulationDefinition(floydWarshall, options),
    sourceNodeId,
  };
};
