import type { Coordinate } from '@shape/types/utility';
import type { TreeNodeKeyArray } from './avl';
import type { TreeNode } from './treeNode';
import type { GEdge, Graph } from '@graph/types';
import { getTreeIndexToPosition } from '@product/sandbox/ui/tree/getTreeBinaryPos';

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

export const treeArrayToGraph = async (
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

  Promise.all(
    nodesNotInNewTree.map((node) =>
      graph.removeNode(node.id, { animate: true }),
    ),
  );

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

  Promise.all(
    treeArray.map((treeNodeKey, i) => {
      if (treeNodeKey === undefined) return;
      const node = graph.getNode(treeNodeKey.toString());
      if (node) return;
      return graph.addNode(
        {
          id: treeNodeKey.toString(),
          label: treeNodeKey.toString(),
          ...positions[i],
        },
        { animate: true, focus: false },
      );
    }),
  );

  Promise.all(
    edgesNotInNewTree.map((edge) =>
      graph.removeEdge(edge.id, { animate: true }),
    ),
  );

  const movementObj = treeArray.map((treeNodeKey, i) => {
    if (treeNodeKey === undefined) return;
    const node = graph.getNode(treeNodeKey.toString());
    if (!node) return
    return { nodeId: node.id, coords: positions[i] }
  }).filter(Boolean)

  graph.bulkMoveNode(movementObj)

  for (const edge of newTreeEdges) {
    graph.addEdge(edge, { animate: true });
  }
};
