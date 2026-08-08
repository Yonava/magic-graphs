import { Graph } from '../graph/types.ts';
import { UseGraphOptions, useGraph } from '../graph/useGraph.ts';
import { useGraphProductShortcuts } from '../shortcuts/useProductShortcuts.ts';
import { UIOptions } from '../ui/useProductUI.ts';
import { ProductId, useMagicProduct } from './index.ts';
import { Magic } from './useMagicProduct.ts';
import { provideGraph, provideMagic } from './useProvidedGraph.ts';

type GraphProductOptions = UseGraphOptions & {
  productId: ProductId;
  localStorage?: boolean;
  annotations?: boolean;
  ui?: UIOptions<Graph>;
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
    },
  );

  useGraphProductShortcuts(magic, graph);

  provideGraph(graph);

  return {
    ...graph,
    magic,
  };
};
