import { Graph } from '@magic/shared/graph';

import { TreeNode } from '../tree/TreeNode.ts';

/**
 * reads the tree encoded in `graph`, where node labels supply values and outgoing
 * edges supply children. sides come from the BST invariant: a child less than its
 * parent goes left, otherwise right.
 *
 * assumes the graph holds a valid binary tree, so exactly one node is without a
 * parent, no node carries more than two children and no edges form a cycle. an
 * empty graph is the one degenerate case, and yields no root.
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

  const build = (id: string): TreeNode => {
    const node = new TreeNode({ id, value: Number(graph.getNode(id).label) });

    for (const childId of childIds.get(id) ?? []) {
      const child = build(childId);
      if (child.value < node.value) node.left = child;
      else node.right = child;
    }

    return node;
  };

  const root = graph.nodes.value.find(({ id }) => !hasParent.has(id));
  if (!root) return undefined;

  return build(root.id);
};
