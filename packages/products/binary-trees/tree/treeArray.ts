import type { TreeNode } from './treeNode';

/**
 * the node at the index of the tree or undefined if the tree index is empty
 */
export type TreeArray = (TreeNode | undefined)[];

/**
 * @returns a tree array where the index of the array corresponds to the tree index
 */
export const getTreeArray = ({
  root,
  treeDepth,
}: {
  root: TreeNode | undefined;
  treeDepth: number;
}) => {
  const treeIndexToNodeId: TreeArray = [];
  if (!root) return treeIndexToNodeId;

  let nodesAtDepth: TreeArray = [root];

  for (let i = 0; i <= treeDepth; i++) {
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
