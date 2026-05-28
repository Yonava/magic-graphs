import { shallowDelta } from '@magic/utils/delta/index';

import type { GEdge, GNode } from '../types.ts';

type GraphState = {
  nodes: GNode[];
  edges: GEdge[];
};

type TransactionOptions = {
  getGraphState: () => GraphState;
  onTransactionSuccess: (payload: TransactionPayload) => void;
};

type GNodeUpdatePayload = {
  node: GNode;
  previousValues: Partial<GNode>;
};

type GEdgeUpdatePayload = {
  edge: GEdge;
  previousValues: Partial<GEdge>;
};

type GNodeUpdateDraft = {
  id: GNode['id'];
  values: Partial<Omit<GNode, 'id'>>;
};

// these are all reference based so we forbid them from being updated
const forbiddenEdgeKeyUpdates = [
  'id',
  'from',
  'to',
] as const satisfies (keyof GEdge)[];
type ForbiddenEdgeKeyUpdates = (typeof forbiddenEdgeKeyUpdates)[number];

type GEdgeUpdateDraft = {
  id: GEdge['id'];
  values: Partial<Omit<GEdge, ForbiddenEdgeKeyUpdates>>;
};

// Shape of the single payload downstream plugins can hook into
export type TransactionPayload = {
  addedNodes: GNode[];
  addedEdges: GEdge[];

  removedNodes: GNode[];
  removedEdges: GEdge[];

  updatedNodes: GNodeUpdatePayload[];
  updatedEdges: GEdgeUpdatePayload[];
};

export type TransactionDraft = {
  addNodes: GNode[];
  addEdges: GEdge[];

  removeNodeIds: GNode['id'][];
  removeEdgeIds: GEdge['id'][];

  updatedNodes: GNodeUpdateDraft[];
  updatedEdges: GEdgeUpdateDraft[];
};

export const createEmptyPayload = (): TransactionPayload => ({
  addedNodes: [],
  addedEdges: [],

  removedNodes: [],
  removedEdges: [],

  updatedNodes: [],
  updatedEdges: [],
});

export const useCommitTransaction = ({
  getGraphState,
  onTransactionSuccess,
}: TransactionOptions) => {
  // 1. Validation
  // 2. Process Mutation State
  // 3. Commit Payload and Return Confirmation
  const commitTransaction = (draft: Partial<TransactionDraft>) => {
    const { nodes, edges } = getGraphState();
    const { getNode, getEdge } = quickGetters({ nodes, edges });

    const payload = createEmptyPayload();

    // PROCESS REMOVALS - edges first, then nodes to ensure references don't hang
    if (draft.removeEdgeIds) {
      for (const edgeId of draft.removeEdgeIds) {
        const edge = getEdge(edgeId);
        if (!edge) continue;
        payload.removedEdges.push(edge);
      }
    }

    if (draft.removeNodeIds) {
      for (const nodeId of draft.removeNodeIds) {
        const node = getNode(nodeId);
        if (!node) continue;
        payload.removedNodes.push(node);
        const orphanedEdges = edges
          .filter((edge) => edge.from === nodeId || edge.to === nodeId)
          .filter(
            (edge) => !payload.removedEdges.some((e) => e.id === edge.id),
          );
        payload.removedEdges.push(...orphanedEdges);
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

    onTransactionSuccess(payload);
    return payload;
  };

  return commitTransaction;
};

function quickGetters({ nodes, edges }: GraphState) {
  const nodeMap = new Map(nodes.map((node) => [node.id, node]));
  const edgeMap = new Map(edges.map((edge) => [edge.id, edge]));
  const getNode = (id: GNode['id']) => nodeMap.get(id);
  const getEdge = (id: GEdge['id']) => edgeMap.get(id);
  return { getNode, getEdge };
}
