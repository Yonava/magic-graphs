import { GEdge, GNode } from '../types.ts';
import { CurryWithBaseGraph, NodeHelpers } from './types.ts';

type CurriedNodeHelpers = CurryWithBaseGraph<NodeHelpers>;

const getOutboundEdges: CurriedNodeHelpers['getOutboundEdges'] =
  (graph) => (nodeId) => {
    const { isGraphDirected } = graph.settings.value;

    const isUndirectedEdgeOutbound = (edge: GEdge) => {
      return edge.from === nodeId || edge.to === nodeId;
    };
    const isDirectedEdgeOutbound = (edge: GEdge) => {
      return edge.from === nodeId;
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
      return edge.from === nodeId || edge.to === nodeId;
    };
    const isDirectedEdgeInbound = (edge: GEdge) => {
      return edge.to === nodeId;
    };

    const edgeFilter = isGraphDirected
      ? isDirectedEdgeInbound
      : isUndirectedEdgeInbound;
    return graph.edges.value.filter(edgeFilter);
  };

const getParents: CurriedNodeHelpers['getParents'] = (graph) => (nodeId) => {
  const inboundEdges = getInboundEdges(graph);
  return inboundEdges(nodeId)
    .map((edge) => edge.to)
    .map((nodeId) => graph.getNode(nodeId)!);
};

const getChildren: CurriedNodeHelpers['getChildren'] = (graph) => (nodeId) => {
  const outboundEdges = getOutboundEdges(graph);
  return outboundEdges(nodeId)
    .map((edge) => edge.to)
    .map((nodeId) => graph.getNode(nodeId)!);
};

const getConnectedEdges: CurriedNodeHelpers['getConnectedEdges'] =
  (graph) => (nodeId) =>
    graph.edges.value.filter(
      (edge) => edge.to === nodeId || edge.from === nodeId,
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
        return edge.from === fromNodeId && edge.to === toNodeId;
      }

      return (
        (edge.from === fromNodeId && edge.to === toNodeId) ||
        (edge.from === toNodeId && edge.to === fromNodeId)
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
      const fromNode1ToNode2 = edge.from === nodeId1 && edge.to === nodeId2;
      const fromNode2ToNode1 = edge.from === nodeId2 && edge.to === nodeId1;
      return fromNode1ToNode2 || fromNode2ToNode1;
    };

    return graph.edges.value.filter(isConnecting);
  },
  getInboundEdges,
  getOutboundEdges,
  getParents,
};
