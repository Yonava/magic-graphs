import { GEdge, GNode } from '../../types.ts';
import {
  GEdgeUpdateDraft,
  GNodeUpdateDraft,
  TransactionPayload,
} from '../transaction/types.ts';

type ElementRemovalPayload = Pick<
  TransactionPayload,
  'removedNodes' | 'removedEdges'
>;

type ElementAdditionPayload = Pick<
  TransactionPayload,
  'addedNodes' | 'addedEdges'
>;

type ElementUpdatePayload = Pick<
  TransactionPayload,
  'updatedNodes' | 'updatedEdges'
>;

export type GraphActions = {
  /**
   * Adds a single {@link GNode | node} to the graph. Missing properties get default values.
   * @param node - The node properties to insert.
   * @returns The newly created node instance.
   */
  addNode: (node: Partial<GNode>) => GNode;

  /**
   * Deletes a single {@link GNode | node} from the graph.
   *
   * ℹ️ **Note:** This action implicitly deletes any connected {@link GEdge | edges}.
   * @param nodeId - The ID of the node to delete.
   * @returns A list of all nodes and edges that were deleted.
   */
  removeNode: (nodeId: GNode['id']) => ElementRemovalPayload;

  /**
   * Updates fields on a {@link GNode | node}.
   * @param options - Object containing the target node ID and the values to change.
   * @returns The updated node instance.
   */
  updateNode: (options: GNodeUpdateDraft) => GNode;

  /**
   * Adds a single {@link GEdge | edge} connecting two existing {@link GNode | nodes}.
   * @param edge - The edge properties to insert.
   * @returns The newly created edge instance.
   */
  addEdge: (edge: Partial<GEdge>) => GEdge;

  /**
   * Deletes a single {@link GEdge | edge} from the graph.
   * @param edgeId - The ID of the edge to delete.
   * @returns The edge instance that was deleted.
   */
  removeEdge: (edgeId: GEdge['id']) => GEdge;

  /**
   * Updates fields on an {@link GEdge | edge}.
   * @param options - Object containing the target edge ID and the values to change.
   * @returns The updated edge instance.
   */
  updateEdge: (options: GEdgeUpdateDraft) => GEdge;

  /**
   * Bulk adds multiple {@link GNode | nodes} and {@link GEdge | edges}.
   * @param elements - Arrays of nodes and/or edges to insert.
   * @returns Lists of all nodes and/or edges that were successfully added.
   */
  addElements: (
    elements: Partial<{
      nodes: Partial<GNode>[];
      edges: Partial<GEdge>[];
    }>,
  ) => ElementAdditionPayload;

  /**
   * Bulk deletes multiple {@link GNode | nodes} and {@link GEdge | edges}.
   *
   * ℹ️ **Note:** If a node is in this batch, all its attached edges get deleted too.
   * @param elementIds - Arrays of target node and/or edge IDs to delete.
   * @returns Lists of everything that got deleted during the operation.
   */
  removeElements: (
    elementIds: Partial<{
      nodeIds: GNode['id'][];
      edgeIds: GEdge['id'][];
    }>,
  ) => ElementRemovalPayload;

  /**
   * Bulk updates multiple {@link GNode | nodes} and {@link GEdge | edges}.
   * @param options - Collections of node and edge updates to run together.
   * @returns Lists of everything that got updated during the operation.
   */
  updateElements: (
    options: Partial<{
      nodes: GNodeUpdateDraft[];
      edges: GEdgeUpdateDraft[];
    }>,
  ) => ElementUpdatePayload;
};
