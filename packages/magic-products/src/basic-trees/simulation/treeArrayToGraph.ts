import { AddGEdgeOptions, AddGNodeOptions } from '@magic/shared/graph/types';

import { TreeNode } from './TreeNode.ts';
import { getTreeNodePositions } from './getTreeNodePositions.ts';
import { treeToArray } from './treeToArray.ts';
import type { Coordinate, TreeNodeValueArray } from './types.ts';

const X_OFFSET = 160;
const Y_OFFSET = 200;

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

  const positions = getTreeNodePositions({
    root,
    rootNodeCoordinates: rootPosition,
    xOffset: X_OFFSET,
    yOffset: Y_OFFSET,
  });

  const treeNodeArray = treeToArray(root);
  const treeArray = treeNodeArray.map((t) => t?.value);

  return {
    edges: edgesInTree(treeArray),
    nodes: treeNodeArray
      .map((node): AddGNodeOptions | undefined =>
        node !== undefined
          ? {
              id: node.value.toString(),
              label: node.value.toString(),
              position: positions.get(node),
            }
          : undefined,
      )
      .filter((v) => v !== undefined),
  };
};
