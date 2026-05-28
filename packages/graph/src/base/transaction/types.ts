import { GEdge, GNode } from '../../types.ts';

export type GraphState = {
  nodes: GNode[];
  edges: GEdge[];
};

export type TransactionOptions = {
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
