import { nullThrows } from '@core/utils/assert';

import { inject, provide } from 'vue';

import { ComponentSlotControls } from '../component-slot/useComponentSlots.ts';
import { Graph } from '../graph/types.ts';
import { LensControls } from '../lens/useLensState.ts';

const KEY = 'PRODUCT_GRAPH';

export type MagicGraph = Graph & {
  magic: {
    lens: LensControls;
    componentSlots: ComponentSlotControls;
  };
};

export const provideGraph = (graph: MagicGraph) => {
  provide(KEY, graph);
};

export const useProvidedGraph = () => {
  const graph = nullThrows(inject<MagicGraph>(KEY), 'graph not provided!');
  return graph;
};
