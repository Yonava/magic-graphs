/**
 * Represents a node in a binary/avl tree
 */
export class TreeNode {
  key: number;
  left: TreeNode | undefined;
  right: TreeNode | undefined;
  height: number;

  constructor(key: number) {
    this.key = key;
    this.left = undefined;
    this.right = undefined;
    this.height = 1;
  }
}
