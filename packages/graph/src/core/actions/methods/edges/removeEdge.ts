import { nullThrows } from '@magic/utils/assert';

import { GraphActionsOptions } from '../../createGraphActions.ts';
import { GraphActions } from '../../types.ts';

export const createRemoveEdgeHandler = ({
  commitTransaction,
}: GraphActionsOptions): GraphActions['removeEdge'] => {
  const removeEdge: GraphActions['removeEdge'] = (edgeId) => {
    const { removedEdgeIds } = commitTransaction({
      removeEdgeIds: [edgeId],
    });

    return nullThrows(
      removedEdgeIds[0],
      'Failed to remove edge. Transaction rejected.',
    );
  };

  return removeEdge;
};
