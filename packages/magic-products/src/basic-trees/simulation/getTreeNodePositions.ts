import { getTreeHeight } from './getTreeHeight.ts';
import type { TreeNode } from './TreeNode.ts';
import type { Coordinate } from './types.ts';

/**
 * maps every node in the tree to the (x, y) position it should be drawn at.
 * `xOffset` is the spacing between adjacent nodes at the tree's deepest
 * level; each level above that doubles its spacing, so a node's slot within
 * its level never changes, but the tree scales wider as it gets deeper
 * (keeping leaves legible) without ballooning shallow trees.
 */
export const getTreeNodePositions = ({
  root,
  rootNodeCoordinates,
  xOffset,
  yOffset,
}: {
  root: TreeNode;
  rootNodeCoordinates: Coordinate;
  xOffset: number;
  yOffset: number;
}): Map<TreeNode, Coordinate> => {
  const positions = new Map<TreeNode, Coordinate>();

  // height counts the root itself, so the deepest real level is at
  // depth (height - 1); offset at depth 1 must be double that leaf
  // offset for every level above it, i.e. xOffset * 2^(height - 3)
  const height = getTreeHeight(root);
  const rootChildOffset = xOffset * Math.pow(2, height - 3);

  const place = (
    node: TreeNode | undefined,
    x: number,
    y: number,
    childOffset: number,
  ) => {
    if (!node) return;

    positions.set(node, { x: Math.round(x), y: Math.round(y) });

    const childY = y + yOffset;
    place(node.left, x - childOffset, childY, childOffset / 2);
    place(node.right, x + childOffset, childY, childOffset / 2);
  };

  place(root, rootNodeCoordinates.x, rootNodeCoordinates.y, rootChildOffset);

  return positions;
};
