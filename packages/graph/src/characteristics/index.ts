import { CoreEventMap } from '../core/events.ts';
import type { CoreGraph } from '../core/types.ts';
import type { AdjacencyLists } from '../useAdjacencyList.ts';
import { useBidirectionalEdges } from './bidirectional.ts';
import { useBipartite } from './bipartite.ts';
import { useComplete } from './complete.ts';
import { useConnected } from './connected.ts';
import { useCycles } from './cycles.ts';
import { useStronglyConnectedComponents } from './scc.ts';

export const useCharacteristics = <A, B extends CoreEventMap, C>({
  graph,
  adjacencyList,
}: {
  graph: CoreGraph<A, B, C>;
  adjacencyList: Pick<
    AdjacencyLists,
    'adjacencyList' | 'undirectedAdjacencyList'
  >;
}) => {
  const connected = useConnected(adjacencyList);
  const bidirectionalEdges = useBidirectionalEdges(graph);
  const sccs = useStronglyConnectedComponents(graph, adjacencyList);
  const bipartite = useBipartite(adjacencyList);
  const cycles = useCycles(graph, sccs, adjacencyList);
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
