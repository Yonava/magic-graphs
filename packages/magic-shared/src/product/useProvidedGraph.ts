import { nullThrows } from '@core/utils/assert';

import { inject, provide } from 'vue';

import { Graph } from '../graph/types.ts';

const KEY = 'PRODUCT_GRAPH';

export const provideGraph = (graph: Graph) => {
  provide(KEY, graph);
};

export const useProvidedGraph = () => {
  const graph = nullThrows(inject<Graph>(KEY), 'graph not provided!');
  return graph;
};
