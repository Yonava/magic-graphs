import { GraphActionsOptions } from '../../createGraphActions.ts';
import { GraphActions } from '../../types.ts';

export const createUpdateElementsHandler = ({
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
