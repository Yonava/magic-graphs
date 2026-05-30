import { GraphActions } from '../../types.ts';
import { GraphActionsOptions } from '../../useGraphActions.ts';

export const createRemoveEdgeHandler = ({
  commitTransaction,
}: GraphActionsOptions): GraphActions['removeEdge'] => {
  const removeEdge: GraphActions['removeEdge'] = (edgeId) => {
    const { removedEdgeIds: removedEdges } = commitTransaction({
      removeEdgeIds: [edgeId],
    });

    const removedEdge = removedEdges[0];
    if (!removedEdge) {
      throw new Error(
        `[Graph Actions] Failed to remove edge. Transaction rejected.`,
      );
    }
    return removedEdge;
  };

  return removeEdge;
};
