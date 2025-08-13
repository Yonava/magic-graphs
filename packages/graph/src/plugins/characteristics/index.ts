import type { BaseGraph } from '../base';
import type { AdjacencyLists } from '../useAdjacencyList';

import { useBidirectionalEdges } from './bidirectional';
import { useBipartite } from './bipartite';
import { useComplete } from './complete';
import { useConnected } from './connected';
import { useCycles } from './cycles';
import { useStronglyConnectedComponents } from './scc';

export const useCharacteristics = (graph: BaseGraph & AdjacencyLists) => {
  const connected = useConnected(graph);
  const bidirectionalEdges = useBidirectionalEdges(graph);
  const sccs = useStronglyConnectedComponents(graph);
  const bipartite = useBipartite(graph.adjacencyList);
  const cycles = useCycles({ ...graph, ...sccs });
  const complete = useComplete(graph);

  return {
    ...complete,
    ...cycles,
    ...sccs,
    ...bidirectionalEdges,
    ...bipartite,
    ...connected,
  };
};
