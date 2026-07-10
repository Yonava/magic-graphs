import { GraphPlugins } from '../graph/types.ts';
import { useProvidedGraph } from '../product/useProvidedGraph.ts';

type Input = GraphPlugins;

export const useThemer = () => {
  const graph = useProvidedGraph();

  const activate = () => {};

  const deactivate = () => {};

  return {
    activate,
    deactivate,
  };
};
