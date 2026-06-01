import { shallowDelta } from '@magic/utils/delta/index';

import type { GEdge, GNode } from '../../types.ts';
import { createEmptyPayload } from './createEmptyPayload.ts';
import type {
  CommitTransaction,
  GraphState,
  TransactionOptions,
} from './types.ts';

// 1. ❌ Validation
// 2. ✅ Process Mutation State
// 3. ✅ Commit Payload and Return Confirmation
export function useCommitTransaction({
  getGraphState,
  onTransactionSucceeded,
}: TransactionOptions): CommitTransaction {
  return (draft) => {
    const { nodes, edges } = getGraphState();
    const { getNode, getEdge } = quickGetters({ nodes, edges });

    const payload = createEmptyPayload();

    // PROCESS REMOVALS - edges first, then nodes to ensure references don't hang
    if (draft.removeEdgeIds) {
      for (const edgeId of draft.removeEdgeIds) {
        const edge = getEdge(edgeId);
        if (!edge) continue;
        payload.removedEdgeIds.push(edge.id);
      }
    }

    if (draft.removeNodeIds) {
      for (const nodeId of draft.removeNodeIds) {
        const node = getNode(nodeId);
        if (!node) continue;
        payload.removedNodeIds.push(node.id);
        const orphanedEdgeIds = edges
          .filter((edge) => edge.from === nodeId || edge.to === nodeId)
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

    // 5. PROCESS UPDATES
    if (draft.updatedEdges) {
      for (const draftEdgeUpdate of draft.updatedEdges) {
        const edge = getEdge(draftEdgeUpdate.id);
        if (!edge) continue;
        const updatedEdgeValues = shallowDelta(edge, draftEdgeUpdate.values);
        if (Object.keys(updatedEdgeValues).length === 0) continue;
        const updatedEdge = { ...edge, ...updatedEdgeValues };
        payload.updatedEdges.push({
          edge: updatedEdge,
          previousValues: shallowDelta(updatedEdge, edge),
        });
      }
    }

    if (draft.updatedNodes) {
      for (const draftNodeUpdate of draft.updatedNodes) {
        const node = getNode(draftNodeUpdate.id);
        if (!node) continue;
        const updatedNodeValues = shallowDelta(node, draftNodeUpdate.values);
        if (Object.keys(updatedNodeValues).length === 0) continue;
        const updatedNode = { ...node, ...updatedNodeValues };
        payload.updatedNodes.push({
          node: updatedNode,
          previousValues: shallowDelta(updatedNode, node),
        });
      }
    }

    onTransactionSucceeded(payload);
    return payload;
  };
}

function quickGetters({ nodes, edges }: GraphState) {
  const nodeMap = new Map(nodes.map((node) => [node.id, node]));
  const edgeMap = new Map(edges.map((edge) => [edge.id, edge]));
  const getNode = (id: GNode['id']) => nodeMap.get(id);
  const getEdge = (id: GEdge['id']) => edgeMap.get(id);
  return { getNode, getEdge };
}
