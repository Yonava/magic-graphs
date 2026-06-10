import { GEdge, GNode } from '../../types.ts';

export type GraphState = {
  nodes: GNode[];
  edges: GEdge[];
};

export type TransactionOptions = {
  getGraphState: () => GraphState;
  onTransactionSucceeded: (payload: TransactionPayload) => void;
};

type GNodeUpdatePayload = {
  node: GNode;
  previousValues: Partial<GNode>;
};

type GEdgeUpdatePayload = {
  edge: GEdge;
  previousValues: Partial<GEdge>;
};

// these are all reference based so we forbid them from being updated
const forbiddenNodeKeyUpdates = ['id'] as const satisfies (keyof GNode)[];
export type ForbiddenNodeKeyUpdates = (typeof forbiddenNodeKeyUpdates)[number];

export type GNodeUpdateDraft = {
  id: GNode['id'];
  values: Partial<Omit<GNode, ForbiddenNodeKeyUpdates>>;
};

// these are all reference based so we forbid them from being updated
const forbiddenEdgeKeyUpdates = [
  'id',
  'source',
  'target',
] as const satisfies (keyof GEdge)[];
export type ForbiddenEdgeKeyUpdates = (typeof forbiddenEdgeKeyUpdates)[number];

export type GEdgeUpdateDraft = {
  id: GEdge['id'];
  values: Partial<Omit<GEdge, ForbiddenEdgeKeyUpdates>>;
};

export type TransactionPayload = {
  addedNodes: GNode[];
  addedEdges: GEdge[];

  removedNodeIds: GNode['id'][];
  removedEdgeIds: GEdge['id'][];

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

export type CommitTransaction = (
  draft: Partial<TransactionDraft>,
) => TransactionPayload;
