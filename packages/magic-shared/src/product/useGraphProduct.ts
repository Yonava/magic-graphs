import { Graph } from '../graph/types.ts';
import { UseGraphOptions, useGraph } from '../graph/useGraph.ts';
import { useGraphProductShortcuts } from '../shortcuts/useProductShortcuts.ts';
import LensChipGroup from '../ui/lens-chips/LensChipGroup.vue';
import { LensChipDefinition } from '../ui/lens-chips/types.ts';
import { UIOptions } from '../ui/useProductUI.ts';
import { ProductId, useMagicProduct } from './index.ts';
import { Magic } from './useMagicProduct.ts';
import { provideGraph } from './useProvidedGraph.ts';

export type GraphLensChipOption = (
  graph: Graph,
) => LensChipDefinition[] | undefined;

type GraphProductOptions = UseGraphOptions & {
  productId: ProductId;
  localStorage?: boolean;
  annotations?: boolean;
  lensChips?: GraphLensChipOption;
  ui?: UIOptions;
};

export type MagicGraph = Graph & {
  magic: Magic;
};

export const useGraphProduct = (options: GraphProductOptions): MagicGraph => {
  const graph = useGraph(options);

  const handleLocalStorageSave = (save: () => void) => {
    graph.events.subscribe('onStructureChange', save);
    graph.nodeDrag.events.subscribe('onNodeDrop', save);
  };

  const lensChips = options.lensChips?.(graph);

  const magic = useMagicProduct(
    {
      canvas: graph.canvas,
      transit: graph.transit,
      history: graph.history,
      events: graph.events,
      setAppearance: (color) => (graph.theme.activePresetName.value = color),
    },
    {
      productId: options.productId,
      localStorage:
        options.localStorage === false ? undefined : handleLocalStorageSave,
      annotations: options.annotations === false ? undefined : graph,
      ui: options.ui,
      lensChips,
    },
  );

  if (lensChips) {
    magic.componentSlots.add({
      id: 'product/lens-chips',
      component: LensChipGroup,
      position: 'top-middle',
    });
  }

  useGraphProductShortcuts(magic, graph);

  provideGraph(graph);

  return {
    ...graph,
    magic,
  };
};
