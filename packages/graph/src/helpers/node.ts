import { GEdge, GNode } from '../types.ts';
import { CurryWithCoreGraph, NodeHelpers } from './types.ts';

type CurriedNodeHelpers = CurryWithCoreGraph<NodeHelpers>;

const getOutboundEdges: CurriedNodeHelpers['getOutboundEdges'] =
  (graph) => (nodeId) => {
    const { isGraphDirected } = graph.settings.value;

    const isUndirectedEdgeOutbound = (edge: GEdge) => {
      return edge.source === nodeId || edge.target === nodeId;
    };
    const isDirectedEdgeOutbound = (edge: GEdge) => {
      return edge.source === nodeId;
    };

    const edgeFilter = isGraphDirected
      ? isDirectedEdgeOutbound
      : isUndirectedEdgeOutbound;
    return graph.edges.value.filter(edgeFilter);
  };

const getInboundEdges: CurriedNodeHelpers['getInboundEdges'] =
  (graph) => (nodeId) => {
    const { isGraphDirected } = graph.settings.value;

    const isUndirectedEdgeInbound = (edge: GEdge) => {
      return edge.source === nodeId || edge.target === nodeId;
    };
    const isDirectedEdgeInbound = (edge: GEdge) => {
      return edge.target === nodeId;
    };

    const edgeFilter = isGraphDirected
      ? isDirectedEdgeInbound
      : isUndirectedEdgeInbound;
    return graph.edges.value.filter(edgeFilter);
  };

const getParents: CurriedNodeHelpers['getParents'] = (graph) => (nodeId) => {
  const inboundEdges = getInboundEdges(graph);
  return inboundEdges(nodeId)
    .map((edge) => edge.target)
    .map((nodeId) => graph.getNode(nodeId)!);
};

const getChildren: CurriedNodeHelpers['getChildren'] = (graph) => (nodeId) => {
  const outboundEdges = getOutboundEdges(graph);
  return outboundEdges(nodeId)
    .map((edge) => edge.target)
    .map((nodeId) => graph.getNode(nodeId)!);
};

const getConnectedEdges: CurriedNodeHelpers['getConnectedEdges'] =
  (graph) => (nodeId) =>
    graph.edges.value.filter(
      (edge) => edge.target === nodeId || edge.source === nodeId,
    );

// TODO needs to become isGraphDirected aware still
// which means hardening them to infinite recursive loop edge cases
// see https://github.com/Yonava/magic-graphs/issues/575
const getAncestors: CurriedNodeHelpers['getAncestors'] =
  (graph) =>
  (nodeId): GNode[] => {
    const parents = getParents(graph)(nodeId);
    const ancestors = parents.flatMap((parent) => {
      return [parent, ...getAncestors(graph)(parent.id)];
    });
    return ancestors;
  };

// TODO needs to become isGraphDirected aware still
// which means hardening them to infinite recursive loop edge cases
// see https://github.com/Yonava/magic-graphs/issues/575
const getDescendants: CurriedNodeHelpers['getDescendants'] =
  (graph) =>
  (nodeId): GNode[] => {
    const children = getChildren(graph)(nodeId);
    const descendants = children.flatMap((child) => {
      return [child, ...getDescendants(graph)(child.id)];
    });
    return descendants;
  };

const getEdgeBetween: CurriedNodeHelpers['getEdgeBetween'] =
  (graph) => (fromNodeId, toNodeId) => {
    const { isGraphDirected } = graph.settings.value;

    return graph.edges.value.find((edge) => {
      if (isGraphDirected) {
        return edge.source === fromNodeId && edge.target === toNodeId;
      }

      return (
        (edge.source === fromNodeId && edge.target === toNodeId) ||
        (edge.source === toNodeId && edge.target === fromNodeId)
      );
    });
  };

export const nodeHelpers: CurriedNodeHelpers = {
  getAncestors,
  getChildren,
  getConnectedEdges,
  getDescendants,
  getEdgeBetween,
  getEdgesBetweenConnectedNodes: (graph) => (nodeId1, nodeId2) => {
    const isConnecting = (edge: GEdge) => {
      const fromNode1ToNode2 =
        edge.source === nodeId1 && edge.target === nodeId2;
      const fromNode2ToNode1 =
        edge.source === nodeId2 && edge.target === nodeId1;
      return fromNode1ToNode2 || fromNode2ToNode1;
    };

    return graph.edges.value.filter(isConnecting);
  },
  getInboundEdges,
  getOutboundEdges,
  getParents,
};
