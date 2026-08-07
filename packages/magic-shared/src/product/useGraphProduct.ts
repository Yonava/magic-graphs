import { onMounted } from 'vue';

import { useComponentSlotsState } from '../component-slot/useComponentSlotsState.ts';
import { ComponentSlotControls } from '../component-slot/useComponentSlotsState.ts';
import { Graph } from '../graph/types.ts';
import { UseGraphOptions, useGraph } from '../graph/useGraph.ts';
import { useLensState } from '../lens/useLensState.ts';
import { LensControls } from '../lens/useLensState.ts';
import { useProductShortcuts } from '../shortcuts/useProductShortcuts.ts';
import { ShortcutControls, useShortcuts } from '../shortcuts/useShortcuts.ts';
import { useSimulationState } from '../simulation/useSimulationState.ts';
import { SimulationControls } from '../simulation/useSimulationState.ts';
import {
  AppearanceControls,
  useProductAppearance,
} from '../ui/appearance/useProductAppearance.ts';
import { loadGraphFromLinkPayload } from '../ui/link-sharing/linkPayload.ts';
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
    shortcuts: ShortcutControls;
  };
};

export const useGraphProduct = (options: GraphProductOptions) => {
  const graph = useGraph(options);

  const componentSlots = useComponentSlotsState();
  const lens = useLensState(componentSlots);
  const simulation = useSimulationState(graph, componentSlots, lens);

  const ui = useProductUI(graph, componentSlots, options.ui);
  const appearance = useProductAppearance(graph);
  const shortcuts = useShortcuts();

  const magicGraph: MagicGraph = {
    ...graph,
    magic: {
      manifest: options.manifest,
      lens,
      componentSlots,
      simulation,
      ui,
      appearance,
      shortcuts,
    },
  };

  if (options.localStorage !== false) {
    useLocalStorageGraphSync(magicGraph);
  }

  if (magicGraph.magic.ui.linkSharing) {
    onMounted(() => loadGraphFromLinkPayload(magicGraph));
  }

  useProductShortcuts(magicGraph);

  provideGraph(magicGraph);

  return magicGraph;
};
