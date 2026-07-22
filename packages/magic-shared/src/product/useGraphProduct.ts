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
import { MagicProductManifest } from './manifest.ts';
import { useLocalStorageGraphSync } from './useLocalStorageGraphSync.ts';
import { provideGraph } from './useProvidedGraph.ts';

type GraphProductOptions = UseGraphOptions & {
  manifest: MagicProductManifest;
  localStorage?: boolean;
  ui?: UIOptions;
};

export type MagicGraph = Graph & {
  magic: {
    manifest: MagicProductManifest;
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

  const ui = useProductUI(graph, componentSlots, options.ui);
  const appearance = useProductAppearance(graph);

  const magicGraph: MagicGraph = {
    ...graph,
    magic: {
      manifest: options.manifest,
      lens,
      componentSlots,
      simulation,
      ui,
      appearance,
    },
  };

  if (options.localStorage !== false) {
    useLocalStorageGraphSync(magicGraph);
  }

  provideGraph(magicGraph);

  return magicGraph;
};
