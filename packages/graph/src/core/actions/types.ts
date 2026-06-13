import { PartiallyPartial } from '@magic/utils/types';

import { GEdge, GNode } from '../../types.ts';
import { Position } from '../nodePositioningSystem.ts';
import {
  GEdgeUpdateDraft,
  GNodeUpdateDraft,
  TransactionPayload,
} from '../transaction/types.ts';

export type ElementRemovalPayload = Pick<
  TransactionPayload,
  'removedNodeIds' | 'removedEdgeIds'
>;

export type ElementAdditionPayload = Pick<
  TransactionPayload,
  'addedNodes' | 'addedEdges'
>;

export type ElementUpdatePayload = Pick<
  TransactionPayload,
  'updatedNodes' | 'updatedEdges'
>;

export type CoreTransactionWrapperOptions = {
  addNode: never;
  removeNode: never;
  updateNode: never;

  addEdge: never;
  removeEdge: never;
  updateEdge: never;

  addElements: never;
  removeElements: never;
  updateElements: never;
};

export type MergeTransactionWrappersWithCore<TransactionWrapperOptions> = {
  [Option in keyof CoreTransactionWrapperOptions]: Option extends keyof TransactionWrapperOptions
    ? TransactionWrapperOptions[Option]
    : never;
};

type UpdateEdge = PartiallyPartial<GEdge, 'id' | 'weight'>;

export type GraphActions<
  OptionsParam = {},
  Options extends Partial<
    Record<keyof CoreTransactionWrapperOptions, unknown>
  > = MergeTransactionWrappersWithCore<OptionsParam>,
> = {
  /**
   * Adds a single {@link GNode | node} to the graph. Missing properties get default values.
   * @param node - The node properties to insert.
   * @returns The newly created node instance.
   */
  addNode: Options['addNode'] extends never
    ? (node: Partial<GNode & Position>) => GNode
    : (
        node: Partial<GNode & Position>,
        options?: Partial<Options['addNode']>,
      ) => GNode;

  /**
   * Deletes a single {@link GNode | node} from the graph.
   *
   * ℹ️ **Note:** This action implicitly deletes any connected {@link GEdge | edges}.
   * @param nodeId - The ID of the node to delete.
   * @returns A list of all nodes and edges that were deleted.
   */
  removeNode: Options['removeNode'] extends never
    ? (nodeId: GNode['id']) => ElementRemovalPayload
    : (
        nodeId: GNode['id'],
        options?: Partial<Options['removeNode']>,
      ) => ElementRemovalPayload;

  /**
   * Updates fields on a {@link GNode | node}.
   * @param options - Object containing the target node ID and the values to change.
   * @returns The updated node instance.
   */
  updateNode: Options['updateNode'] extends never
    ? (options: GNodeUpdateDraft) => GNode
    : (
        options: GNodeUpdateDraft,
        updateOptions?: Partial<Options['updateNode']>,
      ) => GNode;

  /**
   * Adds a single {@link GEdge | edge} connecting two existing {@link GNode | nodes}.
   * @param edge - The edge properties to insert.
   * @returns The newly created edge instance.
   */
  addEdge: Options['addEdge'] extends never
    ? (edge: UpdateEdge) => GEdge
    : (edge: UpdateEdge, options?: Partial<Options['addEdge']>) => GEdge;

  /**
   * Deletes a single {@link GEdge | edge} from the graph.
   * @param edgeId - The ID of the edge to delete.
   * @returns The edge instance that was deleted.
   */
  removeEdge: Options['removeEdge'] extends never
    ? (edgeId: GEdge['id']) => GEdge['id']
    : (
        edgeId: GEdge['id'],
        options?: Partial<Options['removeEdge']>,
      ) => GEdge['id'];

  /**
   * Updates fields on an {@link GEdge | edge}.
   * @param options - Object containing the target edge ID and the values to change.
   * @returns The updated edge instance.
   */
  updateEdge: Options['updateEdge'] extends never
    ? (options: GEdgeUpdateDraft) => GEdge
    : (
        options: GEdgeUpdateDraft,
        updateOptions?: Options['updateEdge'],
      ) => GEdge;

  /**
   * Bulk adds multiple {@link GNode | nodes} and {@link GEdge | edges}.
   * @param elements - Arrays of nodes and/or edges to insert.
   * @returns Lists of all nodes and/or edges that were successfully added.
   */
  addElements: Options['addElements'] extends never
    ? (
        elements: Partial<{
          nodes: Partial<GNode & Position>[];
          edges: UpdateEdge[];
        }>,
      ) => ElementAdditionPayload
    : (
        elements: Partial<{
          nodes: Partial<GNode & Position>[];
          edges: UpdateEdge[];
        }>,
        options?: Options['addElements'],
      ) => ElementAdditionPayload;

  /**
   * Bulk deletes multiple {@link GNode | nodes} and {@link GEdge | edges}.
   *
   * ℹ️ **Note:** If a node is in this batch, all its attached edges get deleted too.
   * @param elementIds - Arrays of target node and/or edge IDs to delete.
   * @returns Lists of everything that got deleted during the operation.
   */
  removeElements: Options['removeElements'] extends never
    ? (
        elementIds: Partial<{
          nodeIds: GNode['id'][];
          edgeIds: GEdge['id'][];
        }>,
      ) => ElementRemovalPayload
    : (
        elementIds: Partial<{
          nodeIds: GNode['id'][];
          edgeIds: GEdge['id'][];
        }>,
        options?: Options['removeElements'],
      ) => ElementRemovalPayload;

  /**
   * Bulk updates multiple {@link GNode | nodes} and {@link GEdge | edges}.
   * @param options - Collections of node and edge updates to run together.
   * @returns Lists of everything that got updated during the operation.
   */
  updateElements: Options['removeElements'] extends never
    ? (
        options: Partial<{
          nodes: GNodeUpdateDraft[];
          edges: GEdgeUpdateDraft[];
        }>,
      ) => ElementUpdatePayload
    : (
        options: Partial<{
          nodes: GNodeUpdateDraft[];
          edges: GEdgeUpdateDraft[];
        }>,
        updateOptions?: Options['updateElements'],
      ) => ElementUpdatePayload;
};
