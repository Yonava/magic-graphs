import type { Edge, Node } from './types.ts';

export const hasCycle = (nodes: Node[], edges: Edge[]) => {
  const parent = new Map<string, string>();

  const find = (id: string): string => {
    if (parent.get(id) !== id) {
      parent.set(id, find(parent.get(id)!));
    }

    return parent.get(id)!;
  };

  const union = (a: string, b: string) => {
    const rootA = find(a);
    const rootB = find(b);

    if (rootA === rootB) return false;

    parent.set(rootA, rootB);
    return true;
  };

  nodes.forEach((node) => {
    parent.set(node.id, node.id);
  });

  for (const edge of edges) {
    if (!union(edge.source, edge.target)) {
      return true;
    }
  }

  return false;
};
