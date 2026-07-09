import { nullThrows } from '@core/utils/assert';

import { CreateCoreAction } from '../../types.ts';

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
