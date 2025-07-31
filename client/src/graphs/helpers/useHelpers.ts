import type { BaseGraph } from '@graph/base';
import type { GEdge, GNode } from '@graph/types';

import {
  getAncestorsOfNode,
  getChildrenOfNode,
  getConnectedEdges,
  getConnectedNodes,
  getDescendantsOfNode,
  getEdgeWeight,
  getEdgeWeightFraction,
  getEdgesAlongPath,
  getInboundEdges,
  getOutboundEdges,
  getParentsOfNode,
  getWeightBetweenNodes,
  isEdgeFlowingIntoNode,
  isEdgeFlowingOutOfNode,
} from '.';

export const useHelpers = (graph: BaseGraph) => ({
  getParentsOfNode: (nodeId: GNode['id']) => getParentsOfNode(nodeId, graph),
  getAncestorsOfNode: (nodeId: GNode['id']) =>
    getAncestorsOfNode(nodeId, graph),
  getChildrenOfNode: (nodeId: GNode['id']) => getChildrenOfNode(nodeId, graph),
  getDescendantsOfNode: (nodeId: GNode['id']) =>
    getDescendantsOfNode(nodeId, graph),

  getConnectedNodes: (edgeId: GEdge['id']) => getConnectedNodes(edgeId, graph),
  getConnectedEdges: (nodeId: GNode['id']) => getConnectedEdges(nodeId, graph),
  getInboundEdges: (nodeId: GNode['id']) => getInboundEdges(nodeId, graph),
  getOutboundEdges: (nodeId: GNode['id']) => getOutboundEdges(nodeId, graph),
  isEdgeFlowingIntoNode: (edgeId: GEdge['id'], nodeId: GNode['id']) =>
    isEdgeFlowingIntoNode(edgeId, nodeId, graph),
  isEdgeFlowingOutOfNode: (edgeId: GEdge['id'], nodeId: GNode['id']) =>
    isEdgeFlowingOutOfNode(edgeId, nodeId, graph),
  getEdgesAlongPath: (node1Id: GNode['id'], node2Id: GNode['id']) =>
    getEdgesAlongPath(node1Id, node2Id, graph),
  getEdgeWeight: (edgeId: GEdge['id']) => getEdgeWeight(edgeId, graph),
  getEdgeWeightFraction: (edgeId: GEdge['id']) =>
    getEdgeWeightFraction(edgeId, graph),
  getWeightBetweenNodes: (fromNodeId: GNode['id'], toNodeId: GNode['id']) =>
    getWeightBetweenNodes(fromNodeId, toNodeId, graph),
});
