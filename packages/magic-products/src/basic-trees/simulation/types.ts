import { TreeNode } from './TreeNode.ts';

export type BalanceMethod =
  'left-left' | 'right-right' | 'left-right' | 'right-left';

/**
 * An array representation of a binary tree, where each index corresponds to a tree position:
 * index 0 is the root, index 1 is the left child, index 2 is the right child, etc.
 *
 * Each index in the array is the tree node value at that position, or `undefined` if no node exists at that position.
 */
export type TreeNodeValueArray = (TreeNode['value'] | undefined)[];

type TargetNode = {
  targetNode: TreeNode['value'];
};

type CompareFrame = {
  action: 'compare';
  comparedNode: TreeNode['value'];
} & TargetNode;

type CompareForRemovalFrame = {
  action: 'compare-removal';
  comparedNode: TreeNode['value'];
} & TargetNode;

type BalanceFrame = {
  action: 'balance';
  method: BalanceMethod;
};

type InsertFrame = {
  action: 'insert';
} & TargetNode;

type RemoveFrame = {
  action: 'remove';
} & TargetNode;

export type AVLFrameNoRoot =
  | CompareFrame
  | CompareForRemovalFrame
  | BalanceFrame
  | InsertFrame
  | RemoveFrame;

export type AVLFrame = AVLFrameNoRoot & { root: TreeNode | undefined };

export type AVLMode = 'insert' | 'remove';

export type Coordinate = {
  x: number;
  y: number;
};
