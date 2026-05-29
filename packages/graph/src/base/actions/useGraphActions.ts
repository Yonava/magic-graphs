import { CommitTransaction } from '../transaction/types.ts';
import { GraphActions } from './types.ts';

type GraphActionsOptions = {
  commitTransaction: CommitTransaction;
};

export const useGraphActions = ({
  commitTransaction,
}: GraphActionsOptions): GraphActions => {};
