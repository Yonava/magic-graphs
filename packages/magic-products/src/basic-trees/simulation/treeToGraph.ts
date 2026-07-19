import { AddGEdgeOptions, AddGNodeOptions } from '@magic/shared/graph/types';

import { TreeNode } from './TreeNode.ts';
import { getTreeNodePositions } from './getTreeNodePositions.ts';
import { TreeArray, treeToArray } from './treeToArray.ts';
import type { Coordinate } from './types.ts';

const X_OFFSET = 160;
const Y_OFFSET = 200;

const newEdge = (source: string, target: string): AddGEdgeOptions => ({
  source: source.toString(),
  target: target.toString(),
  id: `${source}-${target}`,
});

const edgesInTree = (treeArray: TreeArray) => {
  const edges: AddGEdgeOptions[] = [];

  for (let i = 0; i < treeArray.length; i++) {
    const node = treeArray[i];
    if (node === undefined) continue;

    const left = treeArray[2 * i + 1];
    const right = treeArray[2 * i + 2];

    if (left !== undefined) edges.push(newEdge(node.id, left.id));
    if (right !== undefined) edges.push(newEdge(node.id, right.id));
  }

  return edges;
};

export type GraphState = {
  nodes: AddGNodeOptions[];
  edges: AddGEdgeOptions[];
};

export const treeToGraph = (
  root: TreeNode | undefined,
  rootPosition: Coordinate,
): GraphState => {
  if (!root) return { edges: [], nodes: [] };

  const positions = getTreeNodePositions({
    root,
    rootNodeCoordinates: rootPosition,
    xOffset: X_OFFSET,
    yOffset: Y_OFFSET,
  });

  const treeArray = treeToArray(root);

  return {
    edges: edgesInTree(treeArray),
    nodes: treeArray
      .map((node): AddGNodeOptions | undefined =>
        node !== undefined
          ? {
              id: node.id,
              label: node.value.toString(),
              position: positions.get(node),
            }
          : undefined,
      )
      .filter((v) => v !== undefined),
  };
};
