import { CodeEdge, CoreNode } from '../../types.ts';
import { CoreControls } from '../types.ts';

export type GraphState = Pick<CoreControls, 'nodes' | 'edges'>;

export type TransactionOptions = {
  getGraph: () => GraphState;
  onTransactionSucceeded: (payload: TransactionPayload) => void;
};

export type TransactionPayload = {
  addedNodes: CoreNode[];
  addedEdges: CodeEdge[];

  removedNodeIds: CoreNode['id'][];
  removedEdgeIds: CodeEdge['id'][];
};

export type TransactionDraft = {
  addNodes: CoreNode[];
  addEdges: CodeEdge[];

  removeNodeIds: CoreNode['id'][];
  removeEdgeIds: CodeEdge['id'][];
};

export type CommitTransaction = (
  draft: Partial<TransactionDraft>,
) => TransactionPayload;
