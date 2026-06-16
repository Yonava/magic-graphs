import { CreateCoreAction } from '../../types.ts';

export const createRemoveNodeHandler: CreateCoreAction<'removeNode'> =
  ({ graph, commitTransaction }) =>
  ({ id }) => {
    const { removedNodeIds, removedEdgeIds } = commitTransaction({
      removeNodeIds: [id],
    });

    graph.positions._internal.remove([id]);

    return { removedNodeIds, removedEdgeIds };
  };
