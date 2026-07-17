import type { Coordinate } from './types.ts';

/**
 * an array which maps a tree index (root = 0, left child = 1, right child = 2, etc)
 * to the coordinates of where that tree position should be on the screen
 *
 * @example [root, left, right, left-left, left-right, right-left, right-right]
 * console.log(getTreeIndexToPosition[0]) // { x: 0, y: 0 }
 */
export const getTreeIndexToPosition = ({
  rootNodeCoordinates,
  xOffset,
  yOffset,
  treeDepth,
}: {
  rootNodeCoordinates: Coordinate;
  xOffset: number;
  yOffset: number;
  treeDepth: number;
}) => {
  const treeIndexToPositionArr: Coordinate[] = [rootNodeCoordinates];
  const totalWidth = Math.pow(2, treeDepth) * xOffset;

  for (let i = 1; i <= treeDepth; i++) {
    const y = rootNodeCoordinates.y + i * yOffset;
    const spotsOnThisLevel = Math.pow(2, i);

    const xOffset = totalWidth / spotsOnThisLevel;
    const xOffsetPerNode: number[] = [];

    for (let j = 0; j < spotsOnThisLevel; j++) {
      xOffsetPerNode[j] = (j - spotsOnThisLevel / 2 + 0.5) * xOffset;
    }

    for (let j = 0; j < spotsOnThisLevel; j++) {
      treeIndexToPositionArr.push({
        x: rootNodeCoordinates.x + xOffsetPerNode[j],
        y,
      });
    }
  }

  return treeIndexToPositionArr.map(({ x, y }) => ({
    x: Math.round(x),
    y: Math.round(y),
  }));
};
