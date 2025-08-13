import type { GNodeMoveInstruction } from '@magic/graph/base/useGraphCRUD';
import type { GEdge, Graph } from '@magic/graph/types';
import { getTreeIndexToPosition } from '@product/sandbox/ui/tree/getTreeBinaryPos';
import type { Coordinate } from '@shape/types/utility';

import type { TreeNodeKeyArray } from './avl';
import type { TreeNode } from './treeNode';

const newEdge = (from: number, to: number) => ({
  from: from.toString(),
  to: to.toString(),
  id: `${from}-${to}`,
  label: '1',
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
    graph.removeNode(node.id);
  }

  // the tree is empty and all the nodes have been removed
  if (!treeRoot) return;

  const depthToXOffset: Record<number, number> = {
    2: 175,
    3: 135,
    4: 100,
  };

  const positions = getTreeIndexToPosition({
    rootCoordinate: rootPosition,
    xOffset: depthToXOffset[treeRoot.height] ?? 80,
    yOffset: 200,
    treeDepth: treeRoot.height,
  });

  treeArray.forEach((treeNodeKey, i) => {
    if (treeNodeKey === undefined) return;

    const nodeAlreadyDisplayed = graph.getNode(treeNodeKey.toString());
    if (nodeAlreadyDisplayed) return;

    const coordsOfNodeOnTree = positions[i];

    graph.addNode(
      {
        id: treeNodeKey.toString(),
        label: treeNodeKey.toString(),
        ...coordsOfNodeOnTree,
      },
      {
        animate: true,
        focus: false,
      },
    );
  });

  for (const edge of edgesNotInNewTree) {
    graph.removeEdge(edge.id);
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

  graph.bulkMoveNode(movementObj);

  for (const edge of newTreeEdges) {
    graph.addEdge(edge, { animate: true });
  }
};
