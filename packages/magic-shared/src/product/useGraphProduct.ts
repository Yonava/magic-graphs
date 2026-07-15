import { useComponentSlotsState } from '../component-slot/useComponentSlotsState.ts';
import { ComponentSlotControls } from '../component-slot/useComponentSlotsState.ts';
import { Graph } from '../graph/types.ts';
import { UseGraphOptions, useGraph } from '../graph/useGraph.ts';
import { useLensState } from '../lens/useLensState.ts';
import { LensControls } from '../lens/useLensState.ts';
import { useSimulationState } from '../simulation/useSimulationState.ts';
import { SimulationControls } from '../simulation/useSimulationState.ts';
import LensChipGroup from '../ui/lens-chips/LensChipGroup.vue';
import { LensChipDefinition } from '../ui/lens-chips/types.ts';
import { provideGraph } from './useProvidedGraph.ts';

export type UIOptions = {
  lensChips?: (graph: Graph) => LensChipDefinition[];
};

type GraphProductOptions = UseGraphOptions & {
  ui?: UIOptions;
};

type UIControls = {
  lensChips: LensChipDefinition[];
};

export type MagicGraph = Graph & {
  magic: {
    lens: LensControls;
    componentSlots: ComponentSlotControls;
    simulation: SimulationControls;
    ui: UIControls;
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
      ui: {
        lensChips: options?.ui?.lensChips?.(graph) ?? [],
      },
    },
  };

  provideGraph(magicGraph);

  if (options?.ui?.lensChips) {
    componentSlots.add({
      id: 'product/lens-chips',
      component: LensChipGroup,
      position: 'bottom-middle',
    });
  }

  return magicGraph;
};
