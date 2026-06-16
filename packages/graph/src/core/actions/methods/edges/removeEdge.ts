import { nullThrows } from '@magic/utils/assert';

import { CreateCoreActionOptions } from '../../createGraphActions.ts';
import { GraphActions } from '../../types.ts';

export const createRemoveEdgeHandler =
  ({
    commitTransaction,
  }: CreateCoreActionOptions): GraphActions['removeEdge'] =>
  (edgeId) => {
    const { removedEdgeIds } = commitTransaction({
      removeEdgeIds: [edgeId],
    });

    return nullThrows(
      removedEdgeIds[0],
      'Failed to remove edge. Transaction rejected.',
    );
  };
