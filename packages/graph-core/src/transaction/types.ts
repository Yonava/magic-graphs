import { TransactionPayload } from '@magic/graph-primitives/transactions/types';

import { CoreControls } from '../types.ts';

export type GraphState = Pick<CoreControls, 'nodes' | 'edges'>;

export type TransactionOptions = {
  getGraph: () => GraphState;
  onTransactionSucceeded: (payload: TransactionPayload) => void;
};
