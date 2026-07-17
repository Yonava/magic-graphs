/**
 * Represents a node in a binary/avl tree
 */
export class TreeNode {
  value: number;
  left: TreeNode | undefined;
  right: TreeNode | undefined;
  height: number;

  constructor(value: number) {
    this.value = value;
    this.left = undefined;
    this.right = undefined;
    this.height = 1;
  }
}
