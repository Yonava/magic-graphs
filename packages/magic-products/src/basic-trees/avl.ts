import { FrameCollector } from '@magic/shared/simulation';

import { treeToArray } from './treeToArray.ts';

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

/**
 * An array representation of a binary tree, where each index corresponds to a tree position:
 * index 0 is the root, index 1 is the left child, index 2 is the right child, etc.
 *
 * Each index in the array is the tree node value at that position, or `undefined` if no node exists at that position.
 */
export type TreeNodeValueArray = (TreeNode['value'] | undefined)[];

export type BalanceMethod =
  'left-left' | 'right-right' | 'left-right' | 'right-left';

type TargetNode = {
  targetNode: TreeNode['value'];
};

type TreeState = {
  /**
   * the state of the tree in array form
   */
  treeState: TreeNodeValueArray;
};

export type CompareStep = {
  action: 'compare';
  comparedNode: TreeNode['value'];
} & TargetNode &
  TreeState;

export type BalanceStep = {
  action: 'balance';
  method: BalanceMethod;
} & TreeState;

export type InsertStep = {
  action: 'insert';
} & TargetNode &
  TreeState;

export type RemoveStep = {
  action: 'remove';
} & TargetNode &
  TreeState;

export type AVLFrame = CompareStep | BalanceStep | InsertStep | RemoveStep;

export const getHeight = (node: TreeNode | undefined) => {
  return node ? node.height : 0;
};

export const getBalance = (node: TreeNode) => {
  const leftHeight = getHeight(node?.left);
  const rightHeight = getHeight(node?.right);
  return leftHeight - rightHeight;
};

export class AVLTree {
  frameCollector: FrameCollector<AVLFrame>;
  root: TreeNode | undefined;

  constructor(frameCollector: FrameCollector<AVLFrame>) {
    this.frameCollector = frameCollector;
    this.root = undefined;
  }

  reset() {
    this.root = undefined;
  }

  getNode(value: number): TreeNode | undefined {
    let current = this.root;
    while (current) {
      if (value === current.value) {
        return current;
      } else if (value < current.value) {
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

  remove(value: number) {
    if (!this.root) {
      return [];
    }

    let targetFound = false;

    const removeHelper = (
      parent: TreeNode | undefined,
      node: TreeNode | undefined,
      value: number,
      isLeft: boolean,
    ): TreeNode | undefined => {
      if (!node) {
        return undefined;
      }

      if (!targetFound) {
        this.frameCollector.add({
          action: 'compare',
          targetNode: value,
          comparedNode: node.value,
          treeState: this.toArray(),
        });
      }

      if (value < node.value && !targetFound) {
        node.left = removeHelper(node, node.left, value, true);
      } else if (value > node.value && !targetFound) {
        node.right = removeHelper(node, node.right, value, false);
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

          // Create a new node with the successor's value
          replacementNode = new TreeNode(successor.value);
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

        this.frameCollector.add({
          action: 'remove',
          targetNode: value,
          treeState: this.toArray(),
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
        return this.rebalance(parent, node, isLeft);
      }

      return node;
    };

    this.root = removeHelper(undefined, this.root, value, false);
  }

  private rebalance(
    parent: TreeNode | undefined,
    node: TreeNode,
    isLeft: boolean,
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
      this.frameCollector.add({
        action: 'balance',
        method: 'left-left',
        treeState: this.toArray(),
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
      this.frameCollector.add({
        action: 'balance',
        method: 'right-right',
        treeState: this.toArray(),
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
      this.frameCollector.add({
        action: 'balance',
        method: 'left-right',
        treeState: this.toArray(),
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
      this.frameCollector.add({
        action: 'balance',
        method: 'right-left',
        treeState: this.toArray(),
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

  balance() {
    const balanceNode = (
      parent: TreeNode | undefined,
      node: TreeNode | undefined,
      isLeft: boolean,
    ): TreeNode | undefined => {
      if (!node) return undefined;

      // Recursively balance left and right subtrees
      node.left = balanceNode(node, node.left, true);
      node.right = balanceNode(node, node.right, false);

      // Update height after recursive calls
      this.updateHeight(node);

      // Use existing rebalance method
      return this.rebalance(parent, node, isLeft);
    };

    this.root = balanceNode(undefined, this.root, false);
  }

  toArray() {
    return treeToArray({
      root: this.root,
      treeDepth: getHeight(this.root),
    }).map((node) => node?.value);
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

  insert(value: number, rebalance = true) {
    if (!this.root) {
      this.root = new TreeNode(value);
      return [
        {
          action: 'insert',
          targetNode: value,
          treeState: this.toArray(),
        },
      ];
    }

    let justInserted = false;

    const insertHelper = (
      parent: TreeNode | undefined,
      node: TreeNode | undefined,
      value: number,
      isLeft: boolean,
    ): TreeNode => {
      if (!node) {
        const newNode = new TreeNode(value);
        justInserted = true;
        return newNode;
      }

      this.frameCollector.add({
        action: 'compare',
        comparedNode: node.value,
        targetNode: value,
        treeState: this.toArray(),
      });

      if (value < node.value) {
        node.left = insertHelper(node, node.left, value, true);
        if (justInserted) {
          this.frameCollector.add({
            action: 'insert',
            targetNode: value,
            treeState: this.toArray(),
          });
          justInserted = false;
        }
      } else if (value > node.value) {
        node.right = insertHelper(node, node.right, value, false);
        if (justInserted) {
          this.frameCollector.add({
            action: 'insert',
            targetNode: value,
            treeState: this.toArray(),
          });
          justInserted = false;
        }
      } else {
        return node;
      }

      this.updateHeight(node);

      return rebalance ? this.rebalance(parent, node, isLeft) : node;
    };

    this.root = insertHelper(undefined, this.root, value, false);
  }
}
