import { nullThrows } from '@core/utils/assert';
import { FrameCollector } from '@magic/shared/simulation';

import { getTreeHeight } from './simulation/getTreeHeight.ts';
import { TreeNode } from './simulation/TreeNode.ts';
import { AVLFrame, AVLFrameNoRoot } from './simulation/types.ts';

const getBalance = (node: TreeNode) =>
  getTreeHeight(node.left) - getTreeHeight(node.right);

export class AVLTree {
  root: TreeNode | undefined;
  frameCollector: FrameCollector<AVLFrame> | undefined;

  constructor(root?: TreeNode) {
    this.root = root;
  }

  attachFrameCollector(frameCollector: FrameCollector<AVLFrame>) {
    this.frameCollector = frameCollector;
  }

  private addFrame(entry: AVLFrameNoRoot) {
    const collector = nullThrows(this.frameCollector, 'collector is undefined');

    collector.add({
      ...entry,
      root: JSON.parse(JSON.stringify(this.root)),
    });
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

  private removeMin(node: TreeNode): TreeNode | undefined {
    if (!node.left) return node.right;
    node.left = this.removeMin(node.left);
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
    if (!this.root) return;

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
        this.addFrame({
          action: 'compare',
          targetNode: value,
          comparedNode: node.value,
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
        }

        // Update the parent or root reference
        if (parent) {
          if (isLeft) parent.left = replacementNode;
          else parent.right = replacementNode;
        } else {
          this.root = replacementNode;
        }

        this.addFrame({
          action: 'remove',
          targetNode: value,
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
        return this.rebalance(parent, node, isLeft);
      }

      return node;
    };

    this.root = removeHelper(undefined, this.root, value, false);
    return this.root;
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
      this.addFrame({
        action: 'balance',
        method: 'left-left',
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
      this.addFrame({
        action: 'balance',
        method: 'right-right',
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
      this.addFrame({
        action: 'balance',
        method: 'left-right',
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
      this.addFrame({
        action: 'balance',
        method: 'right-left',
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

      // Use existing rebalance method
      return this.rebalance(parent, node, isLeft);
    };

    this.root = balanceNode(undefined, this.root, false);
  }

  private rotateRight(y: TreeNode): TreeNode {
    const x = y.left!;
    const T2 = x.right;

    x.right = y;
    y.left = T2;

    return x;
  }

  private rotateLeft(x: TreeNode): TreeNode {
    const y = x.right!;
    const T2 = y.left;

    y.left = x;
    x.right = T2;

    return y;
  }

  insert(value: number, rebalance = true) {
    if (!this.root) {
      this.root = new TreeNode(value);
      this.addFrame({
        action: 'insert',
        targetNode: value,
      });
      return this.root;
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

      this.addFrame({
        action: 'compare',
        comparedNode: node.value,
        targetNode: value,
      });

      if (value < node.value) {
        node.left = insertHelper(node, node.left, value, true);
        if (justInserted) {
          this.addFrame({
            action: 'insert',
            targetNode: value,
          });
          justInserted = false;
        }
      } else if (value > node.value) {
        node.right = insertHelper(node, node.right, value, false);
        if (justInserted) {
          this.addFrame({
            action: 'insert',
            targetNode: value,
          });
          justInserted = false;
        }
      } else {
        return node;
      }

      return rebalance ? this.rebalance(parent, node, isLeft) : node;
    };

    this.root = insertHelper(undefined, this.root, value, false);
    return this.root;
  }
}
