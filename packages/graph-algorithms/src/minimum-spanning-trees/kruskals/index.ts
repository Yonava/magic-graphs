import Fraction from 'fraction.js';

type Node = {
  id: string;
};

type Edge = {
  id: string;
  source: string;
  target: string;
  weight: Fraction;
};

type Parent = Map<string, string>;
type Rank = Map<string, number>;

const kruskals = (nodes: Node[], edges: Edge[]) => {
  const find = (parent: Parent, nodeId: string): string => {
    if (parent.get(nodeId) !== nodeId) {
      parent.set(nodeId, find(parent, parent.get(nodeId)!));
    }
    return parent.get(nodeId)!;
  };

  const union = (
    parent: Parent,
    rank: Rank,
    nodeA: string,
    nodeB: string,
  ): boolean => {
    const rootA = find(parent, nodeA);
    const rootB = find(parent, nodeB);

    if (rootA === rootB) return false;

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

    return true;
  };

  const sortedEdges = edges.toSorted((a, b) => a.weight.compare(b.weight));

  const parent: Parent = new Map();
  const rank: Rank = new Map();

  nodes.forEach((node) => {
    parent.set(node.id, node.id);
    rank.set(node.id, 0);
  });

  const mst: Edge[] = [];

  for (const edge of sortedEdges) {
    if (union(parent, rank, edge.source, edge.target)) {
      mst.push(edge);

      if (mst.length === nodes.length - 1) break;
    }
  }

  return {
    edges: mst,
    totalWeight: mst.reduce(
      (sum, edge) => sum.add(edge.weight),
      new Fraction(0),
    ),
    connected: mst.length === nodes.length - 1,
  };
};

export default kruskals;
