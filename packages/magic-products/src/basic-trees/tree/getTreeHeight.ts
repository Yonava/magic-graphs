import type { TreeNode } from './TreeNode.ts';

export const getTreeHeight = (node: TreeNode | undefined): number => {
  if (!node) return 0;
  return Math.max(getTreeHeight(node.left), getTreeHeight(node.right)) + 1;
};
