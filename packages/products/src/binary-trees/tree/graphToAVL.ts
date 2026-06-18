import type { Graph } from '../../shared/useGraphWithCanvas.ts';

import type { AVLTree } from './avl.ts';

/**
 * takes a graph and a tree and modifies the tree (in-place) such that it is in sync
 * with the state of the graph.
 *
 * ⚠️ if the graph cannot be parsed as a tree, both graph and tree will reset
 */
export const syncGraphWithTree = (graph: Graph, tree: AVLTree) => {
  tree.reset();
  if (graph.nodes.value.length === 0) return;

  const { getInboundEdges, getChildren } = graph.helpers.nodes;
  const treeRoot = graph.nodes.value.find(
    (node) => getInboundEdges(node.id).length === 0,
  );

  if (!treeRoot) {
    console.warn('could not parse tree from graph');
    // this syncs graph and tree by virtue of them both being empty
    // return graph.reset();
    return;
  }

  const q = [treeRoot];

  while (q.length > 0) {
    const node = q.shift();
    if (!node) continue;
    tree.insert(Number(graph.nodeLabel.get(node.id)), false);
    q.push(...getChildren(node.id));
  }
};
