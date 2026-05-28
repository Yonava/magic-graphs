import type { TransactionPayload } from './types.ts';

export function createEmptyPayload() {
  const payload: TransactionPayload = {
    addedNodes: [],
    addedEdges: [],

    removedNodes: [],
    removedEdges: [],

    updatedNodes: [],
    updatedEdges: [],
  };
  return payload;
}
