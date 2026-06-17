import { GEdge, GNode } from '../../types.ts';
import { CoreControls } from '../types.ts';

export type GraphState = Pick<CoreControls, 'nodes' | 'edges'>;

export type TransactionOptions = {
  getGraph: () => GraphState;
  onTransactionSucceeded: (payload: TransactionPayload) => void;
};

export type TransactionPayload = {
  addedNodes: GNode[];
  addedEdges: GEdge[];

  removedNodeIds: GNode['id'][];
  removedEdgeIds: GEdge['id'][];
};

export type TransactionDraft = {
  addNodes: GNode[];
  addEdges: GEdge[];

  removeNodeIds: GNode['id'][];
  removeEdgeIds: GEdge['id'][];
};

export type CommitTransaction = (
  draft: Partial<TransactionDraft>,
) => TransactionPayload;
