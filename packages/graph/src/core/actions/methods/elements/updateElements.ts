import { GraphActions } from '../../types.ts';
import { GraphActionsOptions } from '../../useGraphActions.ts';

export const createUpdateElementsHandler = ({
  graphState,
  commitTransaction,
}: GraphActionsOptions): GraphActions['updateElements'] => {
  const updateElements: GraphActions['updateElements'] = ({
    nodes: updatedNodes,
    edges: updatedEdges,
  }) => {
    const payload = commitTransaction({
      updatedNodes,
      updatedEdges,
    });

    return {
      updatedEdges: payload.updatedEdges,
      updatedNodes: payload.updatedNodes,
    };
  };

  return updateElements;
};
