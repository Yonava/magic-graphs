import { AddGEdgeOptions, AddGNodeOptions } from '@magic/shared/graph/types';

import { AVLTree } from '../AVLTree.ts';
import { TreeNode } from './TreeNode.ts';
import { getTreeIndexToPosition } from './getTreeIndexToPosition.ts';
import { treeToArray } from './treeToArray.ts';
import type { Coordinate, TreeNodeValueArray } from './types.ts';

const DEPTH_TO_X_OFFSET: Record<number, number> = {
  2: 175,
  3: 135,
  4: 100,
};

const newEdge = (source: number, target: number): AddGEdgeOptions => ({
  source: source.toString(),
  target: target.toString(),
  id: `${source}-${target}`,
});

const edgesInTree = (treeArray: TreeNodeValueArray) => {
  const edges: AddGEdgeOptions[] = [];

  for (let i = 0; i < treeArray.length; i++) {
    const node = treeArray[i];
    if (node === undefined) continue;

    const left = treeArray[2 * i + 1];
    const right = treeArray[2 * i + 2];

    if (left !== undefined) edges.push(newEdge(node, left));
    if (right !== undefined) edges.push(newEdge(node, right));
  }

  return edges;
};

type GraphState = {
  nodes: AddGNodeOptions[];
  edges: AddGEdgeOptions[];
};

export const treeArrayToGraph = (
  root: TreeNode | undefined,
  rootPosition: Coordinate,
): GraphState => {
  if (!root) return { edges: [], nodes: [] };

  const positions = getTreeIndexToPosition({
    rootNodeCoordinates: rootPosition,
    xOffset: DEPTH_TO_X_OFFSET[root.height] ?? 80,
    yOffset: 200,
    treeDepth: root.height,
  });

  const treeArray = treeToArray(root).map((t) => t?.value);

  return {
    edges: edgesInTree(treeArray),
    nodes: treeArray
      .map((v, i): AddGNodeOptions | undefined =>
        v !== undefined
          ? {
              id: v.toString(),
              label: v.toString(),
              position: positions[i],
            }
          : undefined,
      )
      .filter((v) => v !== undefined),
  };
};
