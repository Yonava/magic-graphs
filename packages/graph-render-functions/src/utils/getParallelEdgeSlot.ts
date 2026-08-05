import { CoreEdge } from '@graph/primitives/types';

/** every edge on a path builds the same key, so they all agree on the order without comparing notes */
const orderingKey = (edge: CoreEdge) =>
  [edge.source, edge.target, edge.id].join();

/**
 * where an edge sits in the fan of edges sharing its path, as a signed multiple of the gap between
 * them: 0 when it runs alone, -0.5 and 0.5 for a pair, -1, 0 and 1 for a trio.
 */
export const getParallelEdgeSlot = (
  edgeId: CoreEdge['id'],
  parallelEdges: readonly CoreEdge[],
) => {
  const ordered = parallelEdges.toSorted((previous, next) =>
    orderingKey(previous) < orderingKey(next) ? -1 : 1,
  );

  const index = ordered.findIndex((candidate) => candidate.id === edgeId);
  // an edge missing from its own path has no slot to claim, so it keeps the straight route
  if (index === -1) return 0;

  return index - (ordered.length - 1) / 2;
};
