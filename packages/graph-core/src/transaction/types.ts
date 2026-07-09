import { TransactionPayload } from '@graph/primitives/transactions/types';
import { CoreEdge, CoreNode } from '@graph/primitives/types';

import { CoreControls } from '../types.ts';

export type GraphState = Pick<CoreControls, 'nodes' | 'edges'>;

export type TransactionOptions = {
  getGraph: () => GraphState;
  getters: {
    getEdge: (id: string) => CoreEdge;
    getNode: (id: string) => CoreNode;
  };
  onTransactionSucceeded: (payload: TransactionPayload) => void;
};
