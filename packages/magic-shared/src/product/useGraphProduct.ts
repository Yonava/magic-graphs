import { useComponentSlotsState } from '../component-slot/useComponentSlotsState.ts';
import { ComponentSlotControls } from '../component-slot/useComponentSlotsState.ts';
import { Graph } from '../graph/types.ts';
import { UseGraphOptions, useGraph } from '../graph/useGraph.ts';
import { useLensState } from '../lens/useLensState.ts';
import { LensControls } from '../lens/useLensState.ts';
import { useSimulationState } from '../simulation/useSimulationState.ts';
import { SimulationControls } from '../simulation/useSimulationState.ts';
import {
  AppearanceControls,
  useProductAppearance,
} from '../ui/appearance/useProductAppearance.ts';
import { UIControls, UIOptions, useProductUI } from '../ui/useProductUI.ts';
import { useLocalStorageGraphSync } from './useLocalStorageGraphSync.ts';
import { provideGraph } from './useProvidedGraph.ts';

type GraphProductOptions = UseGraphOptions & {
  productId: string;
  localStorage?: boolean;
  ui?: UIOptions;
};

export type MagicGraph = Graph & {
  magic: {
    lens: LensControls;
    componentSlots: ComponentSlotControls;
    simulation: SimulationControls;
    ui: UIControls;
    appearance: AppearanceControls;
  };
};

export const useGraphProduct = (options: GraphProductOptions) => {
  const graph = useGraph(options);

  const componentSlots = useComponentSlotsState();
  const lens = useLensState(componentSlots);
  const simulation = useSimulationState(graph, componentSlots, lens);

  const ui = useProductUI(options?.ui ?? {}, graph, componentSlots);
  const appearance = useProductAppearance(graph);

  const magicGraph: MagicGraph = {
    ...graph,
    magic: {
      lens,
      componentSlots,
      simulation,
      ui,
      appearance,
    },
  };

  if (options.localStorage !== false) {
    useLocalStorageGraphSync(graph, options.productId);
  }

  provideGraph(magicGraph);

  return magicGraph;
};
