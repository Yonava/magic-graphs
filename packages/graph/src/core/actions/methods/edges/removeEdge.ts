import { CreateCoreAction } from '@magic/graph-core-infra/actions/types';
import { nullThrows } from '@magic/utils/assert';

export const createRemoveEdgeHandler: CreateCoreAction<'removeEdge'> =
  ({ graph, commitTransaction }) =>
  ({ id }) => {
    const { removedEdgeIds } = commitTransaction({
      removeEdgeIds: [id],
    });

    graph.weights._internal.remove([id]);

    return nullThrows(
      removedEdgeIds[0],
      'Failed to remove edge. Transaction rejected.',
    );
  };
