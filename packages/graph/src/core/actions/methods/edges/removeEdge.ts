import { GraphActionsOptions } from '../../createGraphActions.ts';
import { GraphActions } from '../../types.ts';

export const createRemoveEdgeHandler = ({
  commitTransaction,
}: GraphActionsOptions): GraphActions['removeEdge'] => {
  const removeEdge: GraphActions['removeEdge'] = (edgeId) => {
    const { removedEdgeIds } = commitTransaction({
      removeEdgeIds: [edgeId],
    });

    const removedEdgeId = removedEdgeIds[0];
    if (!removedEdgeId) {
      throw new Error(
        `[Graph Actions] Failed to remove edge. Transaction rejected.`,
      );
    }
    return removedEdgeId;
  };

  return removeEdge;
};
