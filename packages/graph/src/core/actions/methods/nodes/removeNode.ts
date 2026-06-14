import { GraphActionsOptions } from '../../createGraphActions.ts';
import { GraphActions } from '../../types.ts';

export const createRemoveNodeHandler = ({
  graph,
  commitTransaction,
}: GraphActionsOptions): GraphActions['removeNode'] => {
  const removeNode: GraphActions['removeNode'] = (nodeId) => {
    const { removedNodeIds, removedEdgeIds } = commitTransaction({
      removeNodeIds: [nodeId],
    });

    graph.positions._internal.remove([nodeId]);

    return { removedNodeIds, removedEdgeIds };
  };

  return removeNode;
};
