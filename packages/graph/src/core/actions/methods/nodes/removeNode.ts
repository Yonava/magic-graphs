import { CreateCoreAction } from '@magic/graph-core-infra/actions/types';

export const createRemoveNodeHandler: CreateCoreAction<'removeNode'> =
  ({ graph, commitTransaction }) =>
  ({ id }) => {
    const { removedNodeIds, removedEdgeIds } = commitTransaction({
      removeNodeIds: [id],
    });

    graph.positions._internal.remove([id]);
    graph.weights._internal.remove(removedEdgeIds);

    return { removedNodeIds, removedEdgeIds };
  };
