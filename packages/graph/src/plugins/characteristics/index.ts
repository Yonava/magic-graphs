import type { BaseGraph } from '../../base/index.ts';
import type { AdjacencyLists } from '../../useAdjacencyList.ts';
import { useBidirectionalEdges } from './bidirectional.ts';
import { useBipartite } from './bipartite.ts';
import { useComplete } from './complete.ts';
import { useConnected } from './connected.ts';
import { useCycles } from './cycles.ts';
import { useStronglyConnectedComponents } from './scc.ts';

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
