import { CurryWithCoreGraph, EdgeHelpers } from './types.ts';

type CurriedEdgeHelpers = CurryWithCoreGraph<EdgeHelpers>;

const getConnectedNodes: CurriedEdgeHelpers['getConnectedNodes'] =
  (graph) => (edgeId) => {
    const edge = graph.getEdge(edgeId);
    if (!edge) throw new Error(`Edge with ID ${edgeId} not found`);
    const sourceNode = graph.getNode(edge.source);
    const targetNode = graph.getNode(edge.target);
    if (!sourceNode || !targetNode) throw new Error('nodes not found');
    return { sourceNode, targetNode };
  };

export const edgeHelpers: CurriedEdgeHelpers = {
  getConnectedNodes,
  isPointingAwayFromNode: (graph) => (edgeId, nodeId) => {
    const { isGraphDirected } = graph.options;

    const edge = graph.getEdge(edgeId);
    if (!edge) throw new Error(`Edge with ID ${edgeId} not found`);

    if (isGraphDirected) {
      return edge.source === nodeId;
    }

    return edge.source === nodeId || edge.target === nodeId;
  },
  isPointingTowardNode: (graph) => (edgeId, nodeId) => {
    const { isGraphDirected } = graph.options;

    const edge = graph.getEdge(edgeId);
    if (!edge) throw new Error(`Edge with ID ${edgeId} not found`);

    if (isGraphDirected) {
      return edge.target === nodeId;
    }

    return edge.source === nodeId || edge.target === nodeId;
  },
};
