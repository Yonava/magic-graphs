import { GraphActionsOptions } from '../../createGraphActions.ts';
import { GraphActions } from '../../types.ts';

export const createRemoveElementsHandler = ({
  graphState,
  commitTransaction,
}: GraphActionsOptions): GraphActions['removeElements'] => {
  const removeElements: GraphActions['removeElements'] = ({
    nodeIds,
    edgeIds,
  }) => {
    const { removedNodeIds, removedEdgeIds } = commitTransaction({
      removeNodeIds: nodeIds,
      removeEdgeIds: edgeIds,
    });

    graphState.nps._internal.remove(removedNodeIds);

    return { removedNodeIds, removedEdgeIds };
  };

  return removeElements;
};
