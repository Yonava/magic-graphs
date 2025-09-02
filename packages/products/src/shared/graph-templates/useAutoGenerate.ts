import type { GEdge, GNode, Graph } from '@magic/graph/types';
import { useLocalStorage } from '@vueuse/core';

import { ref } from 'vue';

import {
  centerNodesOnOriginCoordinates,
  getAverageCoordinates,
} from './helpers';
import {
  generateClusterNodes,
  generateCohesiveEdges,
} from './generationAlgorithms/randomGeneration';
import type { AutoGenerateGraphOptions } from './templateTypes';
import { AUTO_GENERATE_GRAPH_DEFAULTS } from './templateTypes';

export const useAutoGenerate = (graph: Graph) => {
  const options = useLocalStorage<AutoGenerateGraphOptions>(
    'autoGenerateOptions',
    {
      ...AUTO_GENERATE_GRAPH_DEFAULTS,
    },
  );

  const nodes = ref<GNode[]>([]);
  const edges = ref<GEdge[]>([]);

  const generate = () => {
    const generatedNodes = generateClusterNodes(options.value);
    const origin = getAverageCoordinates(graph.nodes.value);
    const centeredNodes = centerNodesOnOriginCoordinates(
      generatedNodes,
      origin,
    );
    edges.value = generateCohesiveEdges(centeredNodes, options.value);
    nodes.value = centeredNodes;
    graph.load({ nodes: nodes.value, edges: edges.value });
  };

  return {
    generate,

    options,
    nodes,
    edges,
  };
};
