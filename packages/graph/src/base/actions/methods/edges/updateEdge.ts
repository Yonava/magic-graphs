import { GraphActions } from '../../types.ts';
import { GraphActionsOptions } from '../../useGraphActions.ts';

export const createUpdateEdgeHandler = ({
  graphState,
  commitTransaction,
}: GraphActionsOptions): GraphActions['updateEdge'] => {
  const updateEdge: GraphActions['updateEdge'] = (update) => {
    const { updatedEdges } = commitTransaction({
      updatedEdges: [update],
    });

    const telemetryUpdate = updatedEdges[0];
    if (!telemetryUpdate) {
      throw new Error(
        `[Graph Actions] Failed to update edge. Transaction rejected.`,
      );
    }

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
