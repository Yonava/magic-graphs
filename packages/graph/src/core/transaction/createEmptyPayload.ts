import type { TransactionPayload } from './types.ts';

export function createEmptyPayload() {
  const payload: TransactionPayload = {
    addedNodes: [],
    addedEdges: [],

    removedNodeIds: [],
    removedEdgeIds: [],
  };
  return payload;
}
