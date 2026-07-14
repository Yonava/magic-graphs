import { useComponentSlotsState } from '../component-slot/useComponentSlotsState.ts';
import { ComponentSlotControls } from '../component-slot/useComponentSlotsState.ts';
import { Graph } from '../graph/types.ts';
import { UseGraphOptions, useGraph } from '../graph/useGraph.ts';
import { useLensState } from '../lens/useLensState.ts';
import { LensControls } from '../lens/useLensState.ts';
import { useSimulationState } from '../simulation/useSimulationState.ts';
import { SimulationControls } from '../simulation/useSimulationState.ts';
import LensChipGroup from './lens-chips/LensChipGroup.vue';
import { LensChipDefinition } from './lens-chips/types.ts';
import { provideGraph } from './useProvidedGraph.ts';

export type MagicProductOptions = {
  lensChips?: (graph: Graph) => LensChipDefinition[];
};

type GraphProductOptions = UseGraphOptions & {
  product?: MagicProductOptions;
};

export type MagicGraph = Graph & {
  magic: {
    lens: LensControls;
    componentSlots: ComponentSlotControls;
    simulation: SimulationControls;
    product: { lensChips: LensChipDefinition[] };
  };
};

export const useGraphProduct = (options?: GraphProductOptions) => {
  const graph = useGraph(options);

  const componentSlots = useComponentSlotsState();
  const lens = useLensState(componentSlots);
  const simulation = useSimulationState(graph, componentSlots, lens);

  const magicGraph: MagicGraph = {
    ...graph,
    magic: {
      lens,
      componentSlots,
      simulation,
      product: {
        lensChips: options?.product?.lensChips?.(graph) ?? [],
      },
    },
  };

  provideGraph(magicGraph);

  if (options?.product?.lensChips) {
    componentSlots.add({
      id: 'product/lens-chips',
      component: LensChipGroup,
      position: 'bottom-middle',
    });
  }

  return magicGraph;
};
