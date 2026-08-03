import type { TreeNode } from './TreeNode.ts';
import { getTreeHeight } from './getTreeHeight.ts';
import type { Coordinate } from './types.ts';

/**
 * maps `node` and every descendant to the (x, y) position it should be drawn at.
 * `xOffset` is the spacing between adjacent nodes at the deepest level; each level
 * above that doubles its spacing, so a node's slot within its level never changes,
 * but the tree scales wider as it gets deeper (keeping leaves legible) without
 * ballooning shallow trees.
 */
export const getTreeNodePositions = ({
  node,
  nodeCoordinates,
  xOffset,
  yOffset,
}: {
  node: TreeNode;
  nodeCoordinates: Coordinate;
  xOffset: number;
  yOffset: number;
}): Map<TreeNode, Coordinate> => {
  const positions = new Map<TreeNode, Coordinate>();

  // height counts `node` itself, so the deepest level is at depth (height - 1);
  // the offset at depth 1 must be double the leaf offset for every level above
  // it, i.e. xOffset * 2^(height - 3)
  const height = getTreeHeight(node);
  const topChildOffset = xOffset * Math.pow(2, height - 3);

  const place = (
    current: TreeNode | undefined,
    x: number,
    y: number,
    childOffset: number,
  ) => {
    if (!current) return;

    positions.set(current, { x: Math.round(x), y: Math.round(y) });

    const childY = y + yOffset;
    place(current.left, x - childOffset, childY, childOffset / 2);
    place(current.right, x + childOffset, childY, childOffset / 2);
  };

  place(node, nodeCoordinates.x, nodeCoordinates.y, topChildOffset);

  return positions;
};
