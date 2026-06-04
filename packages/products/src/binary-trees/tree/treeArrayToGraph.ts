import type { GEdge, GNode } from '@magic/graph/types';
import { Coordinate } from '@magic/shapes/types/utility';
import { Fraction } from 'mathjs';

import { getTreeIndexToPosition } from '../../shared/graph-tree-positioner/positioners/binaryTreePositioner.ts';
import type { Graph } from '../../shared/useGraphWithCanvas.ts';
import type { TreeNodeKeyArray } from './avl.ts';
import type { TreeNode } from './treeNode.ts';

type GNodeMoveInstruction = {
  nodeId: GNode['id'];
  coords: Coordinate;
};

const newEdge = (source: number, target: number): GEdge => ({
  source: source.toString(),
  target: target.toString(),
  id: `${source}-${target}`,
  weight: new Fraction(1),
});

const edgesInTree = (treeArray: TreeNodeKeyArray) => {
  const edges: GEdge[] = [];

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

export const treeArrayToGraph = (
  graph: Graph,
  treeArray: TreeNodeKeyArray,
  treeRoot: TreeNode,
  rootPosition: Coordinate,
) => {
  const newTreeEdges = edgesInTree(treeArray);

  const edgesNotInNewTree = graph.edges.value.filter(
    (edge) => !newTreeEdges.some((newEdge) => newEdge.id === edge.id),
  );

  const nodesNotInNewTree = graph.nodes.value.filter(
    (node) => !treeArray.includes(parseInt(node.id)),
  );

  for (const node of nodesNotInNewTree) {
    graph.actions.removeNode(node.id);
  }

  // the tree is empty and all the nodes have been removed
  if (!treeRoot) return;

  const depthToXOffset: Record<number, number> = {
    2: 175,
    3: 135,
    4: 100,
  };

  const positions = getTreeIndexToPosition({
    rootNodeCoordinate: rootPosition,
    xOffset: depthToXOffset[treeRoot.height] ?? 80,
    yOffset: 200,
    treeDepth: treeRoot.height,
  });

  treeArray.forEach((treeNodeKey, i) => {
    if (treeNodeKey === undefined) return;

    const nodeAlreadyDisplayed = graph.getNode(treeNodeKey.toString());
    if (nodeAlreadyDisplayed) return;

    const coordsOfNodeOnTree = positions[i];

    graph.actions.addNode(
      {
        id: treeNodeKey.toString(),
        label: treeNodeKey.toString(),
        ...coordsOfNodeOnTree,
      },
      {
        // @ts-expect-error migration
        animate: true,
        focus: false,
      },
    );
  });

  for (const edge of edgesNotInNewTree) {
    graph.actions.removeEdge(edge.id);
  }

  const movementObj = treeArray
    .map((treeNodeKey, i): GNodeMoveInstruction | void => {
      if (treeNodeKey === undefined) return;
      const node = graph.getNode(treeNodeKey.toString());
      if (!node)
        return console.error(
          'node in tree not found in graph. this should never happen!',
        );
      return { nodeId: node.id, coords: positions[i] };
    })
    .filter(Boolean) as GNodeMoveInstruction[];

  graph.actions.updateElements(
    {
      nodes: movementObj.map((obj) => ({
        id: obj.nodeId,
        values: obj.coords,
      })),
    },
    // @ts-expect-error migration
    { animate: true },
  );

  for (const edge of newTreeEdges) {
    graph.actions.addEdge(
      edge,
      // @ts-expect-error migration
      { animate: true },
    );
  }
};
