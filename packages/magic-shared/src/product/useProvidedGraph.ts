import { nullThrows } from '@core/utils/assert';

import { inject, provide } from 'vue';

import { MagicGraph } from './useGraphProduct.ts';
import { Magic } from './useMagicProduct.ts';

const KEY = 'PRODUCT_GRAPH';
const MAGIC_KEY = 'MAGIC_PRODUCT';

export const provideGraph = (graph: MagicGraph) => {
  provide(KEY, graph);
};

export const useProvidedGraph = () => {
  const graph = nullThrows(inject<MagicGraph>(KEY), 'graph not provided!');
  return graph;
};

export const provideMagic = (magic: Magic) => {
  provide(MAGIC_KEY, magic);
};

export const useProvidedMagic = () => {
  const graph = nullThrows(inject<Magic>(MAGIC_KEY), 'magic not provided!');
  return graph;
};
