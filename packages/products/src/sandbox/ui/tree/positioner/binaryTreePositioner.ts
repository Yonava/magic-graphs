import type { GNode, Graph } from "@magic/graph/types";

import { Coordinate } from "@magic/shapes/types/utility";
import { NodePosition, TreeGraphPositioner } from "./types";
import { getValue } from "@magic/utils/maybeGetter";

/**
 * an array which maps a tree index (root = 0, left child = 1, right child = 2, etc)
 * to the coordinates of where that tree position should be on the screen
 *
 * @example [root, left, right, left-left, left-right, right-left, right-right]
 * console.log(getTreeIndexToPosition[0]) // { x: 0, y: 0 }
 */
export const getTreeIndexToPosition = ({
  rootNodeCoordinate,
  xOffset,
  yOffset,
  treeDepth,
}: {
  rootNodeCoordinate: Coordinate;
  xOffset: number;
  yOffset: number;
  treeDepth: number;
}) => {
  const treeIndexToPositionArr: Coordinate[] = [rootNodeCoordinate];
  const totalWidth = Math.pow(2, treeDepth) * xOffset;

  for (let i = 1; i <= treeDepth; i++) {
    const y = rootNodeCoordinate.y + i * yOffset;
    const spotsOnThisLevel = Math.pow(2, i);

    const xOffset = totalWidth / spotsOnThisLevel;
    const xOffsetPerNode: number[] = [];

    for (let j = 0; j < spotsOnThisLevel; j++) {
      xOffsetPerNode[j] = (j - spotsOnThisLevel / 2 + 0.5) * xOffset;
    }

    for (let j = 0; j < spotsOnThisLevel; j++) {
      treeIndexToPositionArr.push({
        x: rootNodeCoordinate.x + xOffsetPerNode[j],
        y,
      });
    }
  }

  return treeIndexToPositionArr.map(({ x, y }) => ({
    x: Math.round(x),
    y: Math.round(y),
  }));
};

type MaybeNodeId = GNode["id"] | undefined;

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
const getTreeIndexToNodeId = ({
  graph,
  rootNode,
  treeDepth,
}: {
  graph: Graph;
  rootNode: GNode;
  treeDepth: number;
}) => {
  const treeIndexToNodeId: MaybeNodeId[] = [];

  const { getChildrenOfNode } = graph.helpers;
  let nodesAtDepth: MaybeNodeId[] = [rootNode.id];

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

export const binaryTreePositioner: TreeGraphPositioner = ({
  graph,
  nodeDepths,
  rootNode,
  treeFormationOptions,
}) => {
  const newNodePositions: NodePosition[] = [];

  const { xOffset, yOffset, rootNodeCoordinates } = treeFormationOptions;
  const newRootNodePosition = getValue(rootNodeCoordinates, rootNode);

  const { depth: treeDepth } = nodeDepths;

  const treeIndexToPosition = getTreeIndexToPosition({
    rootNodeCoordinate: newRootNodePosition,
    xOffset,
    yOffset,
    treeDepth,
  });

  const treeIndexToNodeId = getTreeIndexToNodeId({
    graph,
    rootNode,
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
