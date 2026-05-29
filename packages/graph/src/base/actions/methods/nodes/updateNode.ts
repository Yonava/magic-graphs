import { GraphActions } from '../../types.ts';
import { GraphActionsOptions } from '../../useGraphActions.ts';

export const createUpdateNodeHandler = ({
  graphState,
  commitTransaction,
}: GraphActionsOptions): GraphActions['updateNode'] => {
  const updateNode: GraphActions['updateNode'] = (update) => {
    commitTransaction({
      updatedNodes: [update],
    });

    const liveNode = graphState.nodes.value.find((n) => n.id === update.id);
    if (!liveNode) {
      throw new Error(
        `[Graph Actions] Node update succeeded but entity was not found in live state.`,
      );
    }

    return liveNode;
  };

  return updateNode;
};
