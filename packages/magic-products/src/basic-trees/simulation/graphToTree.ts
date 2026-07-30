import { Graph } from '@magic/shared/graph';

import { TreeNode } from './TreeNode.ts';

const subtreeSize = (node: TreeNode | undefined): number =>
  node ? 1 + subtreeSize(node.left) + subtreeSize(node.right) : 0;

/**
 * reads the tree encoded in `graph`, where node labels supply values and
 * outgoing edges supply children. sides come from the BST invariant: a child
 * less than its parent goes left, otherwise right (falling back to whichever
 * slot is free). nodes with an incoming edge can never be the root, and of the
 * remaining candidates the one spanning the most nodes wins, so isolated nodes
 * (suggested nodes, for instance) are ignored as long as a real tree is present
 */
export const graphToTree = (graph: Graph): TreeNode | undefined => {
  const childIds = new Map<string, string[]>();
  const hasParent = new Set<string>();

  for (const edge of graph.edges.value) {
    childIds.set(edge.source, [
      ...(childIds.get(edge.source) ?? []),
      edge.target,
    ]);
    hasParent.add(edge.target);
  }

  const build = (id: string, visited: Set<string>): TreeNode | undefined => {
    if (visited.has(id)) return undefined;
    visited.add(id);

    const node = new TreeNode({ id, value: Number(graph.getNode(id).label) });

    for (const childId of childIds.get(id) ?? []) {
      const child = build(childId, visited);
      if (!child) continue;

      const goesLeft = child.value < node.value;
      if (goesLeft && !node.left) node.left = child;
      else if (!goesLeft && !node.right) node.right = child;
      else if (!node.left) node.left = child;
      else if (!node.right) node.right = child;
    }

    return node;
  };

  let root: TreeNode | undefined;
  let rootSize = 0;

  for (const { id } of graph.nodes.value) {
    if (hasParent.has(id)) continue;

    const candidate = build(id, new Set());
    const candidateSize = subtreeSize(candidate);
    if (candidateSize <= rootSize) continue;

    root = candidate;
    rootSize = candidateSize;
  }

  return root;
};
