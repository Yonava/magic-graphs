import { Fraction } from 'mathjs';

import { CurryWithBaseGraph, EdgeHelpers } from './types.ts';

type CurriedEdgeHelpers = CurryWithBaseGraph<EdgeHelpers>;

const getWeight: CurriedEdgeHelpers['getWeight'] = (graph) => (edgeId) => {
  const { isGraphWeighted } = graph.settings.value;

  const edge = graph.getEdge(edgeId);
  if (!edge) throw new Error(`Edge with ID ${edgeId} not found`);
  return isGraphWeighted ? edge.weight : new Fraction(1);
};

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
  getWeight,
  getConnectedNodes,
  isPointingAwayFromNode: (graph) => (edgeId, nodeId) => {
    const { isGraphDirected } = graph.settings.value;

    const edge = graph.getEdge(edgeId);
    if (!edge) throw new Error(`Edge with ID ${edgeId} not found`);

    if (isGraphDirected) {
      return edge.source === nodeId;
    }

    return edge.source === nodeId || edge.target === nodeId;
  },
  isPointingTowardNode: (graph) => (edgeId, nodeId) => {
    const { isGraphDirected } = graph.settings.value;

    const edge = graph.getEdge(edgeId);
    if (!edge) throw new Error(`Edge with ID ${edgeId} not found`);

    if (isGraphDirected) {
      return edge.target === nodeId;
    }

    return edge.source === nodeId || edge.target === nodeId;
  },
};
