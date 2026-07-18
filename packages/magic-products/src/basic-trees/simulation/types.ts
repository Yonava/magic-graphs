import { NodePayload, TreeNode } from './TreeNode.ts';

export type BalanceMethod =
  'left-left' | 'right-right' | 'left-right' | 'right-left';

export type CompareFrame = {
  action: 'compare';
  comparedNode: TreeNode;
  targetNode: NodePayload;
};

type CompareForRemovalFrame = {
  action: 'compare-removal';
  comparedNode: TreeNode;
  targetNode: NodePayload | undefined;
};

type BalanceFrame = {
  action: 'balance';
  method: BalanceMethod;
};

type InsertFrame = {
  action: 'insert';
  targetNode: NodePayload;
};

type RemoveFrame = {
  action: 'remove';
  targetNode: NodePayload | undefined;
};

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
