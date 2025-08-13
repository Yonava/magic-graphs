import type { GEdge, Graph } from '@graph/types';

export type Parent = Map<string, string>;
export type Rank = Map<string, number>;

export const kruskal = (graph: Graph) => {
  const { nodes, edges } = graph;
  const { getEdgeWeight } = graph.helpers;

  const find = (parent: Parent, nodeId: string): string => {
    if (parent.get(nodeId) !== nodeId) {
      parent.set(nodeId, find(parent, parent.get(nodeId)!));
    }
    return parent.get(nodeId)!;
  };

  const union = (parent: Parent, rank: Rank, nodeA: string, nodeB: string) => {
    const rootA = find(parent, nodeA);
    const rootB = find(parent, nodeB);

    if (rootA !== rootB) {
      const rankA = rank.get(rootA)!;
      const rankB = rank.get(rootB)!;

      if (rankA < rankB) {
        parent.set(rootA, rootB);
      } else if (rankA > rankB) {
        parent.set(rootB, rootA);
      } else {
        parent.set(rootB, rootA);
        rank.set(rootA, rankA + 1);
      }
    }
  };

  const run = () => {
    const sortedEdges = Object.values(edges.value).sort((edgeA, edgeB) => {
      return getEdgeWeight(edgeA.id) - getEdgeWeight(edgeB.id);
    });

    const parent = new Map<string, string>();
    const rank = new Map<string, number>();

    graph.nodes.value.forEach((node) => {
      parent.set(node.id, node.id);
      rank.set(node.id, 0);
    });

    const mst: GEdge[] = [];
    for (const edge of sortedEdges) {
      const sourceRoot = find(parent, edge.from);
      const targetRoot = find(parent, edge.to);

      if (sourceRoot !== targetRoot) {
        mst.push(edge);
        union(parent, rank, sourceRoot, targetRoot);

        if (mst.length === nodes.value.length - 1) break;
      }
    }
    return mst;
  };

  return run();
};
