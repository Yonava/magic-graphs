import { CommitTransaction } from '../transaction/types.ts';

type GraphActionsOptions = {
  commitTransaction: CommitTransaction;
};

export const useGraphActions = ({
  commitTransaction,
}: GraphActionsOptions) => {};
