import { GraphActions } from '../../types.ts';
import { GraphActionsOptions } from '../../useGraphActions.ts';

export const createRemoveNodeHandler = ({
  commitTransaction,
}: GraphActionsOptions): GraphActions['removeNode'] => {
  const removeNode: GraphActions['removeNode'] = (nodeId) => {
    const { removedNodes, removedEdges } = commitTransaction({
      removeNodeIds: [nodeId],
    });
    return { removedNodes, removedEdges };
  };

  return removeNode;
};
