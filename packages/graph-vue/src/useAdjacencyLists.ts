import { AdjacencyListsControls } from '@graph/plugins/adjacency-lists/types';

import { useSignals } from './useSignal.ts';

export const useAdjacencyLists = (adjacencyLists: AdjacencyListsControls) =>
  useSignals({
    standard: adjacencyLists.standard,
    directed: adjacencyLists.directed,
    undirected: adjacencyLists.undirected,
    weighted: adjacencyLists.weighted,
  });
