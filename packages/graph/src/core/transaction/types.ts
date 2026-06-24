import { CoreEdge, CoreNode } from '../../../../graph-core-infra/src/types.ts';
import { CoreControls } from '../types.ts';

export type GraphState = Pick<CoreControls, 'nodes' | 'edges'>;

export type TransactionOptions = {
  getGraph: () => GraphState;
  onTransactionSucceeded: (payload: TransactionPayload) => void;
};

export type TransactionPayload = {
  addedNodes: CoreNode[];
  addedEdges: CoreEdge[];

  removedNodeIds: CoreNode['id'][];
  removedEdgeIds: CoreEdge['id'][];
};

export type TransactionDraft = {
  addNodes: CoreNode[];
  addEdges: CoreEdge[];

  removeNodeIds: CoreNode['id'][];
  removeEdgeIds: CoreEdge['id'][];
};

export type CommitTransaction = (
  draft: Partial<TransactionDraft>,
) => TransactionPayload;
