import { nullThrows } from '@magic/utils/assert';

import { GraphActionsOptions } from '../../createGraphActions.ts';
import { GraphActions } from '../../types.ts';

export const createUpdateEdgeHandler =
  ({
    graph,
    commitTransaction,
  }: GraphActionsOptions): GraphActions['updateEdge'] =>
  (update) => {
    commitTransaction({
      updatedEdges: [update],
    });

    return nullThrows(
      graph.edges.value.find((e) => e.id === update.id),
      'Edge update succeeded but entity was not found in live state.',
    );
  };
