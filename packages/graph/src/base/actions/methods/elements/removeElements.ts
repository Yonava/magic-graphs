import { GraphActions } from '../../types.ts';
import { GraphActionsOptions } from '../../useGraphActions.ts';

export const createRemoveElementsHandler = ({
  commitTransaction,
}: GraphActionsOptions): GraphActions['removeElements'] => {
  const removeElements: GraphActions['removeElements'] = ({
    nodeIds: removeNodeIds,
    edgeIds: removeEdgeIds,
  }) => {
    const { removedNodes, removedEdges } = commitTransaction({
      removeNodeIds,
      removeEdgeIds,
    });

    return { removedNodes, removedEdges };
  };

  return removeElements;
};
