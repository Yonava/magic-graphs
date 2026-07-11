import { useComponentSlots } from '../component-slot/useComponentSlots.ts';
import { UseGraphOptions, useGraph } from '../graph/useGraph.ts';
import { useLensState } from '../lens/useLensState.ts';
import { MagicGraph, provideGraph } from './useProvidedGraph.ts';

export const useGraphProduct = (options?: UseGraphOptions) => {
  const graph = useGraph(options);
  const componentSlots = useComponentSlots();
  const lens = useLensState(componentSlots);

  const magicGraph: MagicGraph = {
    ...graph,
    magic: {
      lens,
      componentSlots,
    },
  };

  provideGraph(magicGraph);

  return magicGraph;
};
