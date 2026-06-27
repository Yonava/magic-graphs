import { TransactionPayload } from '@magic/graph-primitives/transactions/types';

export function createEmptyPayload() {
  const payload: TransactionPayload = {
    addedNodes: [],
    addedEdges: [],

    removedNodeIds: [],
    removedEdgeIds: [],
  };
  return payload;
}
