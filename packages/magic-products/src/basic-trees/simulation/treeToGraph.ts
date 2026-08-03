import { AddGEdgeOptions, AddGNodeOptions } from '@magic/shared/graph/types';

import { TreeNode } from './TreeNode.ts';
import { getTreeNodePositions } from './getTreeNodePositions.ts';
import { TreeNodeArray, treeNodeToArray } from './treeNodeToArray.ts';
import type { Coordinate } from './types.ts';

const X_OFFSET = 160;
const Y_OFFSET = 200;

const newEdge = (source: string, target: string): AddGEdgeOptions => ({
  source,
  target,
  id: `${source}-${target}`,
});

/** one edge per parent to child link, read off the position each index encodes */
const edgesBetweenNodes = (nodes: TreeNodeArray) => {
  const edges: AddGEdgeOptions[] = [];

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (node === undefined) continue;

    const left = nodes[2 * i + 1];
    const right = nodes[2 * i + 2];

    if (left !== undefined) edges.push(newEdge(node.id, left.id));
    if (right !== undefined) edges.push(newEdge(node.id, right.id));
  }

  return edges;
};

export type GraphState = {
  nodes: AddGNodeOptions[];
  edges: AddGEdgeOptions[];
};

/** lays out `node` and its descendants as graph elements, with `node` at `nodePosition` */
export const treeToGraph = (
  node: TreeNode | undefined,
  nodePosition: Coordinate,
): GraphState => {
  if (!node) return { edges: [], nodes: [] };

  const positions = getTreeNodePositions({
    node,
    nodeCoordinates: nodePosition,
    xOffset: X_OFFSET,
    yOffset: Y_OFFSET,
  });

  const nodes = treeNodeToArray(node);

  return {
    edges: edgesBetweenNodes(nodes),
    nodes: nodes
      .map((treeNode): AddGNodeOptions | undefined =>
        treeNode !== undefined
          ? {
              id: treeNode.id,
              label: treeNode.value.toString(),
              position: positions.get(treeNode),
            }
          : undefined,
      )
      .filter((treeNode) => treeNode !== undefined),
  };
};
