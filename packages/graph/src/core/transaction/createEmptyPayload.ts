import { TransactionPayload } from '@magic/graph-core-infra/transactions/types';

export function createEmptyPayload() {
  const payload: TransactionPayload = {
    addedNodes: [],
    addedEdges: [],

    removedNodeIds: [],
    removedEdgeIds: [],
  };
  return payload;
}
