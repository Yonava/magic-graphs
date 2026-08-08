import { onMounted } from 'vue';

import { useComponentSlotsState } from '../component-slot/useComponentSlotsState.ts';
import { Graph } from '../graph/types.ts';
import { UseGraphOptions, useGraph } from '../graph/useGraph.ts';
import { useLensState } from '../lens/useLensState.ts';
import {
  useGraphProductShortcuts,
  useProductShortcuts,
} from '../shortcuts/useProductShortcuts.ts';
import { useShortcuts } from '../shortcuts/useShortcuts.ts';
import { useSimulationState } from '../simulation/useSimulationState.ts';
import { useProductAppearance } from '../ui/appearance/useProductAppearance.ts';
import { loadFromLinkPayload } from '../ui/link-sharing/linkPayload.ts';
import { UIOptions, useProductUI } from '../ui/useProductUI.ts';
import { ProductId, manifests } from './index.ts';
import { useLocalStorageGraphSync } from './useLocalStorageGraphSync.ts';
import { Magic } from './useMagicProduct.ts';
import { provideGraph, provideMagic } from './useProvidedGraph.ts';

type GraphProductOptions = UseGraphOptions & {
  productId: ProductId;
  localStorage?: boolean;
  ui?: UIOptions<Graph>;
};

export type MagicGraph = Graph & {
  magic: Magic;
};

export const useGraphProduct = (options: GraphProductOptions) => {
  const graph = useGraph(options);

  const componentSlots = useComponentSlotsState();
  const lens = useLensState(componentSlots);
  const simulation = useSimulationState(
    graph.events.subscribe,
    componentSlots,
    lens,
  );

  const ui = useProductUI(graph, componentSlots, options.ui);
  const appearance = useProductAppearance(
    (color) => (graph.theme.activePresetName.value = color),
  );
  const shortcuts = useShortcuts();

  const magicGraph: MagicGraph = {
    ...graph,
    magic: {
      manifest: manifests[options.productId],
      lens,
      componentSlots,
      simulation,
      ui,
      appearance,
      shortcuts,
      canvas: {
        events: graph.canvas.events,
        surface: graph.canvas.surface,
      },
      transit: graph.transit,
      history: graph.history,
    },
  };

  if (options.localStorage !== false) {
    useLocalStorageGraphSync(magicGraph);
  }

  if (magicGraph.magic.ui.linkSharing) {
    onMounted(() => loadFromLinkPayload(magicGraph.magic));
  }

  useProductShortcuts(magicGraph.magic);
  useGraphProductShortcuts(magicGraph);

  provideGraph(magicGraph);
  provideMagic(magicGraph.magic);

  return magicGraph;
};
