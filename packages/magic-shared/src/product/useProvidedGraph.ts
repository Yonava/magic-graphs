import { nullThrows } from '@core/utils/assert';

import { inject, provide } from 'vue';

import { MagicGraph } from './useGraphProduct.ts';

const KEY = 'PRODUCT_GRAPH';

export const provideGraph = (graph: MagicGraph) => {
  provide(KEY, graph);
};

export const useProvidedGraph = () => {
  const graph = nullThrows(inject<MagicGraph>(KEY), 'graph not provided!');
  return graph;
};
