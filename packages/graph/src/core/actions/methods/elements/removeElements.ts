import { GraphActions } from '../../types.ts';
import { GraphActionsOptions } from '../../useGraphActions.ts';

export const createRemoveElementsHandler = ({
  commitTransaction,
}: GraphActionsOptions): GraphActions['removeElements'] => {
  const removeElements: GraphActions['removeElements'] = ({
    nodeIds: removeNodeIds,
    edgeIds: removeEdgeIds,
  }) => {
    const { removedNodeIds: removedNodes, removedEdgeIds: removedEdges } =
      commitTransaction({
        removeNodeIds,
        removeEdgeIds,
      });

    return { removedNodeIds: removedNodes, removedEdgeIds: removedEdges };
  };

  return removeElements;
};
