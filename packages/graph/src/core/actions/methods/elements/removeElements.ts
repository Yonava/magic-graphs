import { GraphActionsOptions } from '../../createGraphActions.ts';
import { GraphActions } from '../../types.ts';

export const createRemoveElementsHandler =
  ({
    graph,
    commitTransaction,
  }: GraphActionsOptions): GraphActions['removeElements'] =>
  ({ nodeIds, edgeIds }) => {
    const { removedNodeIds, removedEdgeIds } = commitTransaction({
      removeNodeIds: nodeIds,
      removeEdgeIds: edgeIds,
    });

    graph.positions._internal.remove(removedNodeIds);

    return { removedNodeIds, removedEdgeIds };
  };
