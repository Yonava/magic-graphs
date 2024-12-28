import { getTreeArray } from "./treeArray";
import { TreeNode } from "./treeNode";

export type TreeNodeKeyArray = (TreeNode['key'] | undefined)[];

export type BalanceMethod = "left-left" | "right-right" | "left-right" | "right-left";

export type CompareAction = {
  action: "compare";
  treeNodeKey: number;
  treeState: TreeNodeKeyArray;
}

export type BalanceAction = {
  action: "balance";
  method: BalanceMethod;
  treeState: TreeNodeKeyArray;
}

export type InsertAction = {
  action: "insert";
  treeState: TreeNodeKeyArray;
}

export type RemoveAction = {
  action: "remove";
  treeState: TreeNodeKeyArray;
}

export type TreeTrace = CompareAction | BalanceAction | InsertAction | RemoveAction;

export const getHeight = (node: TreeNode | undefined) => {
  return node ? node.height : 0;
}

export const getBalance = (node: TreeNode) => {
  const leftHeight = getHeight(node?.left);
  const rightHeight = getHeight(node?.right);
  return leftHeight - rightHeight;
}

export class AVLTree {
  root: TreeNode | undefined;

  constructor() {
    this.root = undefined;
  }

  getNode(key: number): TreeNode | undefined {
    let current = this.root;
    while (current) {
      if (key === current.key) {
        return current;
      } else if (key < current.key) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return undefined;
  }

  private updateHeight(node: TreeNode): void {
    node.height = Math.max(getHeight(node.left), getHeight(node.right)) + 1;
  }

  private removeMin(node: TreeNode): TreeNode | undefined {
    if (!node.left) return node.right;
    node.left = this.removeMin(node.left);
    this.updateHeight(node);
    return node;
  }

  private findMin(node: TreeNode): TreeNode {
    let current = node;
    while (current.left) {
      current = current.left;
    }
    return current;
  }

  remove(key: number): TreeTrace[] {
    if (!this.root) {
      return [];
    }

    const trace: TreeTrace[] = [];
    let targetFound = false;

    const removeHelper = (parent: TreeNode | undefined, node: TreeNode | undefined, key: number, isLeft: boolean): TreeNode | undefined => {
      if (!node) {
        return undefined;
      }

      if (!targetFound) {
        trace.push({
          action: "compare",
          treeNodeKey: node.key,
          treeState: this.toArray(),
        });
      }

      if (key < node.key && !targetFound) {
        node.left = removeHelper(node, node.left, key, true);
      } else if (key > node.key && !targetFound) {
        node.right = removeHelper(node, node.right, key, false);
      } else {
        targetFound = true;

        // Handle removal
        let replacementNode: TreeNode | undefined;

        if (!node.left && !node.right) {
          // Case 1: Leaf node
          replacementNode = undefined;
        } else if (!node.left) {
          // Case 2: Only right child
          replacementNode = node.right;
        } else if (!node.right) {
          // Case 3: Only left child
          replacementNode = node.left;
        } else {
          // Case 4: Two children
          const successor = this.findMin(node.right);

          // Create a new node with the successor's key
          replacementNode = new TreeNode(successor.key);
          replacementNode.left = node.left;
          // Remove the successor and attach the remaining right subtree
          replacementNode.right = this.removeMin(node.right);
          replacementNode.height = node.height;
        }

        // Update the parent or root reference
        if (parent) {
          if (isLeft) parent.left = replacementNode;
          else parent.right = replacementNode;
        } else {
          this.root = replacementNode;
        }

        trace.push({
          action: "remove",
          treeState: this.toArray()
        });

        // Restore the tree for further processing
        if (parent) {
          if (isLeft) parent.left = node;
          else parent.right = node;
        } else {
          this.root = node;
        }

        return replacementNode;
      }

      if (node) {
        this.updateHeight(node);
        return this.rebalance(parent, node, isLeft, trace);
      }

      return node;
    };

    this.root = removeHelper(undefined, this.root, key, false);
    return trace;
  }

  private rebalance(
    parent: TreeNode | undefined,
    node: TreeNode,
    isLeft: boolean,
    trace: TreeTrace[]
  ): TreeNode {
    const balance = getBalance(node);

    // Left Left Case
    if (balance > 1 && getBalance(node.left!) >= 0) {
      const result = this.rotateRight(node);
      if (parent) {
        if (isLeft) parent.left = result;
        else parent.right = result;
      } else {
        this.root = result;
      }
      trace.push({
        action: "balance",
        method: "left-left",
        treeState: this.toArray()
      });
      if (parent) {
        if (isLeft) parent.left = node;
        else parent.right = node;
      } else {
        this.root = node;
      }
      return result;
    }

    // Right Right Case
    if (balance < -1 && getBalance(node.right!) <= 0) {
      const result = this.rotateLeft(node);
      if (parent) {
        if (isLeft) parent.left = result;
        else parent.right = result;
      } else {
        this.root = result;
      }
      trace.push({
        action: "balance",
        method: "right-right",
        treeState: this.toArray()
      });
      if (parent) {
        if (isLeft) parent.left = node;
        else parent.right = node;
      } else {
        this.root = node;
      }
      return result;
    }

    // Left Right Case
    if (balance > 1 && getBalance(node.left!) < 0) {
      node.left = this.rotateLeft(node.left!);
      const result = this.rotateRight(node);
      if (parent) {
        if (isLeft) parent.left = result;
        else parent.right = result;
      } else {
        this.root = result;
      }
      trace.push({
        action: "balance",
        method: "left-right",
        treeState: this.toArray()
      });
      if (parent) {
        if (isLeft) parent.left = node;
        else parent.right = node;
      } else {
        this.root = node;
      }
      return result;
    }

    // Right Left Case
    if (balance < -1 && getBalance(node.right!) > 0) {
      node.right = this.rotateRight(node.right!);
      const result = this.rotateLeft(node);
      if (parent) {
        if (isLeft) parent.left = result;
        else parent.right = result;
      } else {
        this.root = result;
      }
      trace.push({
        action: "balance",
        method: "right-left",
        treeState: this.toArray()
      });
      if (parent) {
        if (isLeft) parent.left = node;
        else parent.right = node;
      } else {
        this.root = node;
      }
      return result;
    }

    return node;
  }

  balance(): TreeTrace[] {
    const trace: TreeTrace[] = [];

    const balanceNode = (
      parent: TreeNode | undefined,
      node: TreeNode | undefined,
      isLeft: boolean
    ): TreeNode | undefined => {
      if (!node) return undefined;

      // Recursively balance left and right subtrees
      node.left = balanceNode(node, node.left, true);
      node.right = balanceNode(node, node.right, false);

      // Update height after recursive calls
      this.updateHeight(node);

      // Use existing rebalance method
      return this.rebalance(parent, node, isLeft, trace);
    };

    this.root = balanceNode(undefined, this.root, false);
    return trace;
  }

  toArray() {
    return getTreeArray({
      root: this.root,
      treeDepth: getHeight(this.root)
    }).map(node => node?.key);
  }

  private rotateRight(y: TreeNode): TreeNode {
    const x = y.left!;
    const T2 = x.right;

    x.right = y;
    y.left = T2;

    this.updateHeight(y);
    this.updateHeight(x);

    return x;
  }

  private rotateLeft(x: TreeNode): TreeNode {
    const y = x.right!;
    const T2 = y.left;

    y.left = x;
    x.right = T2;

    this.updateHeight(x);
    this.updateHeight(y);

    return y;
  }

  insert(key: number, rebalance = true): TreeTrace[] {
    if (!this.root) {
      this.root = new TreeNode(key);
      return [{
        action: "insert",
        treeState: this.toArray()
      }];
    }

    const trace: TreeTrace[] = [];
    let justInserted = false;

    const insertHelper = (parent: TreeNode | undefined, node: TreeNode | undefined, key: number, isLeft: boolean): TreeNode => {
      if (!node) {
        const newNode = new TreeNode(key);
        justInserted = true;
        return newNode;
      }

      trace.push({
        action: "compare",
        treeNodeKey: node.key,
        treeState: this.toArray()
      });

      if (key < node.key) {
        node.left = insertHelper(node, node.left, key, true);
        if (justInserted) {
          trace.push({
            action: "insert",
            treeState: this.toArray()
          });
          justInserted = false;
        }
      } else if (key > node.key) {
        node.right = insertHelper(node, node.right, key, false);
        if (justInserted) {
          trace.push({
            action: "insert",
            treeState: this.toArray()
          });
          justInserted = false;
        }
      } else {
        return node;
      }

      this.updateHeight(node);

      return rebalance ? this.rebalance(parent, node, isLeft, trace) : node;
    };

    this.root = insertHelper(undefined, this.root, key, false);
    return trace;
  }
}