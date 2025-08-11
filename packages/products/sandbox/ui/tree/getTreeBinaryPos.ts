import type { GNode, Graph } from '@graph/types';
import type { Coordinate } from '@shape/types/utility';

import type { NodeDepth } from './useNodeDepth';

/**
 * an array which maps a tree index (root = 0, left child = 1, right child = 2, etc)
 * to the coordinates of where that tree position should be on the screen
 *
 * @example [root, left, right, left-left, left-right, right-left, right-right]
 * console.log(getTreeIndexToPosition[0]) // { x: 0, y: 0 }
 */
export const getTreeIndexToPosition = ({
  rootCoordinate,
  xOffset,
  yOffset,
  treeDepth,
}: {
  rootCoordinate: Coordinate;
  xOffset: number;
  yOffset: number;
  treeDepth: number;
}) => {
  const treeIndexToPositionArr: Coordinate[] = [rootCoordinate];
  const totalWidth = Math.pow(2, treeDepth) * xOffset;

  for (let i = 1; i <= treeDepth; i++) {
    const y = rootCoordinate.y + i * yOffset;
    const spotsOnThisLevel = Math.pow(2, i);

    const xOffset = totalWidth / spotsOnThisLevel;
    const xOffsetPerNode: number[] = [];

    for (let j = 0; j < spotsOnThisLevel; j++) {
      xOffsetPerNode[j] = (j - spotsOnThisLevel / 2 + 0.5) * xOffset;
    }

    for (let j = 0; j < spotsOnThisLevel; j++) {
      treeIndexToPositionArr.push({
        x: rootCoordinate.x + xOffsetPerNode[j],
        y,
      });
    }
  }

  return treeIndexToPositionArr.map(({ x, y }) => ({
    x: Math.round(x),
    y: Math.round(y),
  }));
};

type MaybeNodeId = GNode['id'] | undefined;

/**
 * an array which contains at index i the node id that should be at tree index i
 * or `undefined` if there is no node at that tree index
 *
 * @example [root, left, right, left-left, undefined, undefined, undefined]
 * //                 1
 * //               /   \
 * //              2     3
 * //             /
 * //            4
 */
export const getTreeIndexToNodeId = ({
  graph,
  root,
  treeDepth,
}: {
  graph: Graph;
  root: GNode;
  treeDepth: number;
}) => {
  const treeIndexToNodeId: MaybeNodeId[] = [];

  const { getChildrenOfNode } = graph.helpers;
  let nodesAtDepth: MaybeNodeId[] = [root.id];

  for (let i = 0; i <= treeDepth; i++) {
    const nodesAtNextDepth: MaybeNodeId[] = [];
    for (const maybeNodeId of nodesAtDepth) {
      treeIndexToNodeId.push(maybeNodeId);
      if (!maybeNodeId) {
        nodesAtNextDepth.push(undefined);
        nodesAtNextDepth.push(undefined);
        continue;
      }
      const children = getChildrenOfNode(maybeNodeId);
      nodesAtNextDepth.push(children[0]?.id);
      nodesAtNextDepth.push(children[1]?.id);
    }
    nodesAtDepth = [...nodesAtNextDepth];
  }

  return treeIndexToNodeId;
};

export const getTreeBinaryPos = (
  graph: Graph,
  root: GNode,
  nodeDepths: NodeDepth,
  treeOffset: { xOffset: number; yOffset: number },
) => {
  const newNodePositions: { nodeId: GNode['id']; coords: Coordinate }[] = [];

  const { xOffset, yOffset } = treeOffset;
  const { depth: treeDepth } = nodeDepths;

  const treeIndexToPosition = getTreeIndexToPosition({
    rootCoordinate: root,
    xOffset,
    yOffset,
    treeDepth,
  });

  const treeIndexToNodeId = getTreeIndexToNodeId({
    graph,
    root,
    treeDepth,
  });

  for (let i = 0; i < treeIndexToNodeId.length; i++) {
    const nodeId = treeIndexToNodeId[i];
    if (!nodeId) continue;
    const newPos = treeIndexToPosition[i];
    newNodePositions.push({
      nodeId,
      coords: newPos,
    });
  }

  return newNodePositions;
};
