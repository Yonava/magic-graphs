import { Coordinate } from '@canvas/primitives/types/utility';
import { CoreEdge, CoreNode } from '@graph/primitives/types';

import { EdgeRenderProps } from '../types.ts';

/**
 * nodes one hop from either endpoint, excluding the endpoints themselves
 */
export const getNeighborPositions = (
  edge: Readonly<EdgeRenderProps>,
  edges: readonly CoreEdge[],
  nodePosition: (nodeId: string) => Readonly<Coordinate>,
) => {
  const endpoints = new Set([edge.source.id, edge.target.id]);
  const neighborIds = new Set<CoreNode['id']>();

  for (const candidate of edges) {
    if (endpoints.has(candidate.source)) neighborIds.add(candidate.target);
    if (endpoints.has(candidate.target)) neighborIds.add(candidate.source);
  }

  for (const endpoint of endpoints) neighborIds.delete(endpoint);

  return [...neighborIds].map(nodePosition);
};
