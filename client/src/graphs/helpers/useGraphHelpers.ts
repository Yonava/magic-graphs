import type { GEdge, GNode } from "@graph/types";
import { usePersistentGraph } from "@graph/compositions/usePersistentGraph";
import {
  getConnectedEdges,
  getConnectedNodes,
  getEdgesAlongPath,
  getEdgeWeight,
  getInboundEdges,
  getOutboundEdges,
  getWeightBetweenNodes,
  isEdgeFlowingIntoNode,
  isEdgeFlowingOutOfNode
} from ".";

type PersistentGraph = ReturnType<typeof usePersistentGraph>

export const useGraphHelpers = (graph: PersistentGraph) => ({
  getConnectedNodes: (edgeId: GEdge['id']) => getConnectedNodes(edgeId, graph),
  getConnectedEdges: (nodeId: GNode['id']) => getConnectedEdges(nodeId, graph),
  getInboundEdges: (nodeId: GNode['id']) => getInboundEdges(nodeId, graph),
  getOutboundEdges: (nodeId: GNode['id']) => getOutboundEdges(nodeId, graph),
  isEdgeFlowingIntoNode: (edgeId: GEdge['id'], nodeId: GNode['id']) => isEdgeFlowingIntoNode(
    edgeId,
    nodeId,
    graph
  ),
  isEdgeFlowingOutOfNode: (edgeId: GEdge['id'], nodeId: GNode['id']) => isEdgeFlowingOutOfNode(
    edgeId,
    nodeId,
    graph
  ),
  getEdgesAlongPath: (node1Id: GNode['id'], node2Id: GNode['id']) => getEdgesAlongPath(
    node1Id,
    node2Id,
    graph
  ),
  getEdgeWeight: (edgeId: GEdge['id']) => getEdgeWeight(edgeId, graph),
  getWeightBetweenNodes: (fromNodeId: GNode['id'], toNodeId: GNode['id']) => getWeightBetweenNodes(
    fromNodeId,
    toNodeId,
    graph
  )
})