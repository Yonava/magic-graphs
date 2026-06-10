import { GraphActions } from '../../types.ts';
import { GraphActionsOptions } from '../../useGraphActions.ts';

export const createRemoveNodeHandler = ({
  commitTransaction,
}: GraphActionsOptions): GraphActions['removeNode'] => {
  const removeNode: GraphActions['removeNode'] = (nodeId) => {
    const { removedNodeIds: removedNodes, removedEdgeIds: removedEdges } =
      commitTransaction({
        removeNodeIds: [nodeId],
      });
    return { removedNodeIds: removedNodes, removedEdgeIds: removedEdges };
  };

  return removeNode;
};
