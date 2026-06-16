import { CreateCoreAction } from '../../types.ts';

export const createRemoveElementsHandler: CreateCoreAction<'removeElements'> =
  ({ graph, commitTransaction }) =>
  ({ nodes, edges }) => {
    const { removedNodeIds, removedEdgeIds } = commitTransaction({
      removeNodeIds: nodes.map((n) => n.id),
      removeEdgeIds: edges.map((e) => e.id),
    });

    graph.positions._internal.remove(removedNodeIds);

    return { removedNodeIds, removedEdgeIds };
  };
