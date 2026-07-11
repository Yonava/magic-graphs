import { useComponentSlotsState } from '../component-slot/useComponentSlotsState.ts';
import { UseGraphOptions, useGraph } from '../graph/useGraph.ts';
import { useLensState } from '../lens/useLensState.ts';
import { useSimulationState } from '../simulation/useSimulationState.ts';
import { MagicGraph, provideGraph } from './useProvidedGraph.ts';

export const useGraphProduct = (options?: UseGraphOptions) => {
  const graph = useGraph(options);

  const componentSlots = useComponentSlotsState();
  const lens = useLensState(componentSlots);
  const simulation = useSimulationState(lens, graph);

  const magicGraph: MagicGraph = {
    ...graph,
    magic: {
      lens,
      componentSlots,
      simulation,
    },
  };

  provideGraph(magicGraph);

  return magicGraph;
};
