import { CurryWithCoreGraph, EdgeHelpers } from './types.ts';

type CurriedEdgeHelpers = CurryWithCoreGraph<EdgeHelpers>;

export const edgeHelpers: CurriedEdgeHelpers = {
  isPointingAwayFromNode: (graph) => (edgeId, nodeId) => {
    const { directed: isGraphDirected } = graph.metadata;

    const edge = graph.getEdge(edgeId);
    if (!edge) throw new Error(`Edge with ID ${edgeId} not found`);

    if (isGraphDirected) {
      return edge.source === nodeId;
    }

    return edge.source === nodeId || edge.target === nodeId;
  },
  isPointingTowardNode: (graph) => (edgeId, nodeId) => {
    const { directed: isGraphDirected } = graph.metadata;

    const edge = graph.getEdge(edgeId);
    if (!edge) throw new Error(`Edge with ID ${edgeId} not found`);

    if (isGraphDirected) {
      return edge.target === nodeId;
    }

    return edge.source === nodeId || edge.target === nodeId;
  },
};
