import { GraphActionsOptions } from '../../createGraphActions.ts';
import { GraphActions } from '../../types.ts';

export const createUpdateEdgeHandler = ({
  graphState,
  commitTransaction,
}: GraphActionsOptions): GraphActions['updateEdge'] => {
  const updateEdge: GraphActions['updateEdge'] = (update) => {
    commitTransaction({
      updatedEdges: [update],
    });

    const liveEdge = graphState.edges.value.find((e) => e.id === update.id);
    if (!liveEdge) {
      throw new Error(
        `[Graph Actions] Edge update succeeded but entity was not found in live state.`,
      );
    }

    return liveEdge;
  };

  return updateEdge;
};
