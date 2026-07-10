import { UseGraphOptions, useGraph } from '../graph/useGraph.ts';
import { provideGraph } from './useProvidedGraph.ts';

export const useGraphProduct = (options?: UseGraphOptions) => {
  const graph = useGraph(options);
  provideGraph(graph);
  return graph;
};
