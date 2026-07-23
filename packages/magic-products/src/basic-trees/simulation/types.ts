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

type CompareDuplicateFound = {
  action: 'compare-duplicate-found';
  preexistingNode: TreeNode;
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
  // node value in this case since node doesn't exist, so we should't be referencing an ID that doest exist
  targetNodeValue: NodePayload['value'] | undefined;
};

export type AVLFrameNoRoot =
  | CompareFrame
  | CompareForRemovalFrame
  | CompareDuplicateFound
  | BalanceFrame
  | InsertFrame
  | RemoveFrame;

export type AVLFrame = AVLFrameNoRoot & { root: TreeNode | undefined };

export type AVLMode = 'insert' | 'remove';

export type Coordinate = {
  x: number;
  y: number;
};
