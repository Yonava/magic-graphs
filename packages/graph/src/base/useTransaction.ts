import type { Coordinate } from '@magic/shapes/types/utility';
import type { Ref } from 'vue';

import type { GEdge, GNode } from '../types.ts';
import type { EdgeMap, NodeMap } from './useNodeEdgeMap.ts';
import { DeepPartial } from 'ts-essentials';
import { delta } from '../../../utils/dist/types/delta/index.ts';

type TransactionOptions = {
  nodes: Ref<GNode[]>;
  edges: Ref<GEdge[]>;
  nodeMap: NodeMap;
  edgeMap: EdgeMap;

  onTransactionSuccess: (payload: TransactionPayload) => void;
};

type GNodeUpdatePayload = {
  node: GNode;
  previousValues: DeepPartial<GNode>;
};

type GEdgeUpdatePayload = {
  edge: GEdge;
  previousValues: DeepPartial<GEdge>;
};

type GNodeUpdateDraft = {
  nodeId: GNode['id'];
  values: Partial<Omit<GNode, 'id'>>;
};

type GEdgeUpdateDraft = {
  edgeId: GEdge['id'];
  values: Partial<Omit<GEdge, 'id' | 'from' | 'to'>>;
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
  addNodes?: GNode[];
  addEdges?: GEdge[];

  removeNodeIds?: GNode['id'][];
  removeEdgeIds?: GEdge['id'][];

  updatedNodes: GNodeUpdateDraft[];
  updatedEdges: GEdgeUpdateDraft[];
};

export const useTransaction = ({
  nodes,
  edges,
  nodeMap,
  edgeMap,
  onTransactionSuccess,
}: TransactionOptions) => {

  // --- READ OPERATIONS ---
  const getNode = (id: GNode['id']) => nodeMap.value.get(id);
  const getEdge = (id: GEdge['id']) => edgeMap.value.get(id);

  // --- THE TRANSACTION ENGINE ---
  const commitTransaction = (draft: TransactionDraft) => {
    const payload: TransactionPayload = {
      addedNodes: [],
      addedEdges: [],

      removedNodes: [],
      removedEdges: [],

      updatedNodes: [],
      updatedEdges: [],
    };

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
        const orphanedEdges = edges.value
          .filter((edge) =>  edge.from === nodeId || edge.to === nodeId)
          .filter((edge) => !payload.removedEdges.some((e) => e.id === edge.id))
        payload.removedEdges.push(...orphanedEdges);
      }
    }

    // double check the implications of removing the nodes and edges
    // from state before the entire transaction is completed!
    // i think the commit phase of the transaction should
    // take place completely at the end
    // 1. Validation
    // 2. Process Mutation State
    // 3. Commit Payload and Return Confirmation
    if (payload.removedEdges.length > 0) {
      const removedIds = new Set(payload.removedEdges.map((e) => e.id));
      edges.value = edges.value.filter((e) => !removedIds.has(e.id));
    }

    if (payload.removedNodes.length > 0) {
      const removedIds = new Set(payload.removedNodes.map((n) => n.id));
      nodes.value = nodes.value.filter((n) => !removedIds.has(n.id));
    }

    // 2. PROCESS NODE + EDGE ADDITIONS
    // like above comment, maybe we set
    // nodes.value and edges.value once the payload has fully cleared
    if (draft.addNodes && draft.addNodes.length > 0) {
      nodes.value.push(...draft.addNodes);
      payload.addedNodes.push(...draft.addNodes)
    }

    if (draft.addEdges && draft.addEdges.length > 0) {
        edges.value.push(...draft.addEdges);
      payload.addedEdges.push(...draft.addEdges)

      }

    // 5. PROCESS UPDATES
    if (draft.updatedNodes) {
      for (const draftEdgeUpdate of draft.updatedEdges) {
        const edge = getEdge(draftEdgeUpdate.edgeId)
        if (!edge) continue;
        const difference = delta(edge, draftEdgeUpdate.values) as DeepPartial<GEdge>
      }
    }

    onTransactionSuccess(payload)
    return payload;
  };

  // --- REFACTORED CONVENIENCE UTILITIES ---
  // Keeping simple wrappers so you don't have to rewrite calls throughout your UI components immediately

  const addNode = (node: Partial<GNode>) => commitTransaction({ addNodes: [node] }).addedNodes[0];
  const bulkAddNode = (nodesList: Partial<GNode>[]) => commitTransaction({ addNodes: nodesList });

  const addEdge = (edge: Partial<GEdge>) => commitTransaction({ addEdges: [edge] }).addedEdges[0];
  const bulkAddEdge = (edgesList: Partial<GEdge>[]) => commitTransaction({ addEdges: edgesList });

  const moveNode = (id: GNode['id'], coords: Coordinate) => commitTransaction({ moveNodes: [{ nodeId: id, coords }] });
  const bulkMoveNode = (nodeMovements: GNodeMoveInstruction[]) => commitTransaction({ moveNodes: nodeMovements });

  const editEdgeLabel = (edgeId: GEdge['id'], newWeight: GEdge['weight']) =>
    commitTransaction({ updateEdgeLabels: [{ id: edgeId, weight: newWeight }] });

  const removeNode = (id: GNode['id']) => {
    const tx = commitTransaction({ removeNodeIds: [id] });
    return tx.removedNodes.length > 0 ? ([tx.removedNodes[0], tx.removedEdges] as const) : undefined;
  };
  const bulkRemoveNode = (nodeIds: GNode['id'][]) => commitTransaction({ removeNodeIds: nodeIds });

  const removeEdge = (edgeId: GEdge['id']) => commitTransaction({ removeEdgeIds: [edgeId] }).removedEdges[0];
  const bulkRemoveEdge = (edgeIds: GEdge['id'][]) => commitTransaction({ removeEdgeIds: edgeIds }).removedEdges;

  return {
    getNode,
    getEdge,
    commitTransaction, // Exposed for running advanced multi-mutation changes natively

    // Legacy Signatures backward compatibility
    addNode,
    addEdge,
    moveNode,
    bulkMoveNode,
    editEdgeLabel,
    removeNode,
    removeEdge,
    bulkAddNode,
    bulkRemoveNode,
    bulkAddEdge,
    bulkRemoveEdge,
  };
};