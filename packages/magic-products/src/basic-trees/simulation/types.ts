import { TreeNode } from './TreeNode.ts';

type BalanceMethod = 'left-left' | 'right-right' | 'left-right' | 'right-left';

/**
 * An array representation of a binary tree, where each index corresponds to a tree position:
 * index 0 is the root, index 1 is the left child, index 2 is the right child, etc.
 *
 * Each index in the array is the tree node value at that position, or `undefined` if no node exists at that position.
 */
type TreeNodeValueArray = (TreeNode['value'] | undefined)[];

type TargetNode = {
  targetNode: TreeNode['value'];
};

type TreeState = {
  /**
   * the state of the tree in array form
   */
  treeState: TreeNodeValueArray;
};

type CompareFrame = {
  action: 'compare';
  comparedNode: TreeNode['value'];
} & TargetNode &
  TreeState;

type BalanceFrame = {
  action: 'balance';
  method: BalanceMethod;
} & TreeState;

type InsertFrame = {
  action: 'insert';
} & TargetNode &
  TreeState;

type RemoveFrame = {
  action: 'remove';
} & TargetNode &
  TreeState;

export type AVLFrame = CompareFrame | BalanceFrame | InsertFrame | RemoveFrame;

export type AVLMode = 'insert' | 'remove';
