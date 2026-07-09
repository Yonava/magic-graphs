import { CommitTransaction } from '@graph/primitives/transactions/types';

import { createEmptyPayload } from './createEmptyPayload.ts';
import type { TransactionOptions } from './types.ts';

// TODO 1. ❌ Validation https://github.com/Yonava/magic-graphs/issues/598
// 2. ✅ Process Mutation State
// 3. ✅ Commit Payload and Return Confirmation
export function createCommitTransaction({
  getGraph,
  getters,
  onTransactionSucceeded,
}: TransactionOptions): CommitTransaction {
  return (draft) => {
    const { edges } = getGraph();
    const payload = createEmptyPayload();

    // PROCESS REMOVALS - edges first, then nodes to ensure references don't hang
    if (draft.removeEdgeIds) {
      for (const edgeId of draft.removeEdgeIds) {
        const edge = getters.getEdge(edgeId);
        if (!edge) continue;
        payload.removedEdgeIds.push(edge.id);
      }
    }

    if (draft.removeNodeIds) {
      for (const nodeId of draft.removeNodeIds) {
        const node = getters.getNode(nodeId);
        if (!node) continue;
        payload.removedNodeIds.push(node.id);
        const orphanedEdgeIds = edges
          .filter((edge) => edge.source === nodeId || edge.target === nodeId)
          .filter(
            (edge) => !payload.removedEdgeIds.some((id) => id === edge.id),
          )
          .map((edge) => edge.id);
        payload.removedEdgeIds.push(...orphanedEdgeIds);
      }
    }

    // 2. PROCESS NODE + EDGE ADDITIONS
    if (draft.addNodes && draft.addNodes.length > 0) {
      payload.addedNodes.push(...draft.addNodes);
    }

    if (draft.addEdges && draft.addEdges.length > 0) {
      payload.addedEdges.push(...draft.addEdges);
    }

    onTransactionSucceeded(payload);
    return payload;
  };
}
