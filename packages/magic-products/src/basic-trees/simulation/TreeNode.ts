export type NodePayload = { value: number; id: string };

/**
 * Represents a node in a binary/avl tree
 */
export class TreeNode {
  id: string;
  value: number;
  left: TreeNode | undefined;
  right: TreeNode | undefined;

  constructor(node: NodePayload) {
    this.id = node.id;
    this.value = node.value;
    this.left = undefined;
    this.right = undefined;
  }
}
