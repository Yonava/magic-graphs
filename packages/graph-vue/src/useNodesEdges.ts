import { useSignal } from './utils/useSignal.ts';

type NodesEdgesGetters<Node, Edge> = {
  getNodes: () => Node[];
  getEdges: () => Edge[];
};

export const useNodesEdges = <Node, Edge>(
  graph: NodesEdgesGetters<Node, Edge>,
) => ({
  nodes: useSignal(graph.getNodes),
  edges: useSignal(graph.getEdges),
});
