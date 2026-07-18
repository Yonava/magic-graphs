import { TreeNode } from './TreeNode.ts';
import { getTreeHeight } from './getTreeHeight.ts';

/**
 * An array representation of a binary tree, where each index corresponds to a tree position:
 * index 0 is the root, index 1 is the left child, index 2 is the right child, etc.
 *
 * Each index in the array is the TreeNode at that position, or `undefined` if no node exists at that position.
 */

export type TreeArray = (TreeNode | undefined)[];

/**
 * @returns a tree array where the index of the array corresponds to the tree index
 */
export const treeToArray = (root: TreeNode | undefined) => {
  if (!root) return [];

  const treeIndexToNodeId: TreeArray = [];
  if (!root) return treeIndexToNodeId;

  let nodesAtDepth: TreeArray = [root];

  for (let i = 0; i <= getTreeHeight(root); i++) {
    const nodesAtNextDepth: TreeArray = [];

    for (const maybeTreeNode of nodesAtDepth) {
      treeIndexToNodeId.push(maybeTreeNode);
      nodesAtNextDepth.push(maybeTreeNode?.left);
      nodesAtNextDepth.push(maybeTreeNode?.right);
    }

    nodesAtDepth = [...nodesAtNextDepth];
  }

  return treeIndexToNodeId;
};
