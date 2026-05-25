import { Fraction } from 'mathjs';

import { CurryWithBaseGraph, EdgeHelpers } from './types';

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
    const fromNode = graph.getNode(edge.from);
    const toNode = graph.getNode(edge.to);
    if (!fromNode || !toNode) throw new Error('nodes not found');
    return { fromNode, toNode };
  };

export const edgeHelpers: CurriedEdgeHelpers = {
  getWeight,
  getConnectedNodes,
  isPointingAwayFromNode: (graph) => (edgeId, nodeId) => {
    const { isGraphDirected } = graph.settings.value;

    const edge = graph.getEdge(edgeId);
    if (!edge) throw new Error(`Edge with ID ${edgeId} not found`);

    if (isGraphDirected) {
      return edge.from === nodeId;
    }

    return edge.from === nodeId || edge.to === nodeId;
  },
  isPointingTowardNode: (graph) => (edgeId, nodeId) => {
    const { isGraphDirected } = graph.settings.value;

    const edge = graph.getEdge(edgeId);
    if (!edge) throw new Error(`Edge with ID ${edgeId} not found`);

    if (isGraphDirected) {
      return edge.to === nodeId;
    }

    return edge.from === nodeId || edge.to === nodeId;
  },
};
