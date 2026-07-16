import { DeepReadonly } from 'ts-essentials';

import { CoreEdge, CoreNode } from '../types.ts';

export type TransactionPayload = {
  addedNodes: CoreNode[];
  addedEdges: CoreEdge[];

  removedNodeIds: CoreNode['id'][];
  removedEdgeIds: CoreEdge['id'][];
};

type TransactionDraft = {
  addNodes: CoreNode[];
  addEdges: CoreEdge[];

  removeNodeIds: CoreNode['id'][];
  removeEdgeIds: CoreEdge['id'][];
};

export type CommitTransaction = (
  draft: Partial<TransactionDraft>,
) => TransactionPayload;

export type ElementRemovalPayload = Pick<
  TransactionPayload,
  'removedNodeIds' | 'removedEdgeIds'
>;

export type ElementAdditionPayload = Pick<
  TransactionPayload,
  'addedNodes' | 'addedEdges'
>;

// owned and emitted by create-graph (not core), since only create-graph knows when a
// fully-composed plugin action has finished, not just the underlying core transaction.
// the type lives here, alongside the payload shapes it's derived from, so plugin-shared's
// baseline event map can reference it without importing graph-create-graph (which would cycle).
export type StructuralEventMap = {
  /** triggered when any nodes or edges are added or removed, or an edge weight is changed */
  onStructureChange: () => void;
  /** when nodes are added to the graph as part of a single graph action */
  onNodesAdded: (nodes: Readonly<CoreNode[]>) => void;
  /** when nodes are removed from the graph as part of a single graph action */
  onNodesRemoved: (
    removedNodeIds: Readonly<CoreNode['id'][]>,
    removedEdgeIds: Readonly<CoreEdge['id'][]>,
  ) => void;
  /** when one or more edges are added to the graph as part of a single graph action */
  onEdgesAdded: (edges: Readonly<CoreEdge[]>) => void;
  /** when one or more edges are removed from the graph as part of a single graph action */
  onEdgesRemoved: (edgeIds: Readonly<CoreEdge['id'][]>) => void;
  /** when any nodes or edges are added */
  onElementsAdded: (additions: DeepReadonly<ElementAdditionPayload>) => void;
  /** when any nodes or edges are removed */
  onElementsRemoved: (removals: DeepReadonly<ElementRemovalPayload>) => void;
};
