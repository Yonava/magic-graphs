import type { GNode, Graph } from "@graph/types";
import type { NodeDepth } from "@product/search-visualizer/useNodeDepth";
import type { Coordinate } from "@shape/types";
import { roundToNearestN } from "@utils/math";

export const getTreeStandardPos = (
  graph: Pick<Graph, 'getNode'>,
  rootPosition: Coordinate,
  nodeDepths: NodeDepth,
  treeOffset: { x: number, y: number }
) => {
  const { depthToNodeIds } = nodeDepths;
  const newNodePositions: Map<GNode['id'], Coordinate> = new Map();
  const roundToNearest10 = roundToNearestN(10);

  for (let i = 1; i < depthToNodeIds.length; i++) {
    const nodeIds = depthToNodeIds[i];
    const yOffset = i * treeOffset.y
    const xOffsetPerNode = []

    const hasMiddleNode = nodeIds.length % 2 === 1;
    if (hasMiddleNode) {
      const middleNodeIndex = Math.floor(nodeIds.length / 2);
      xOffsetPerNode[middleNodeIndex] = 0;

      for (let j = 1; j <= middleNodeIndex; j++) {
        xOffsetPerNode[middleNodeIndex + j] = j * treeOffset.x;
        xOffsetPerNode[middleNodeIndex - j] = -j * treeOffset.x;
      }
    } else {
      for (let j = 0; j < nodeIds.length; j++) {
        xOffsetPerNode[j] = (j - nodeIds.length / 2 + 0.5) * treeOffset.x;
      }
    }

    for (let j = 0; j < nodeIds.length; j++) {
      const node = graph.getNode(nodeIds[j]);
      if (!node) throw new Error(`node with id ${nodeIds[j]} not found`);

      const x = rootPosition.x + xOffsetPerNode[j];
      const y = rootPosition.y + yOffset;

      newNodePositions.set(node.id, {
        x: roundToNearest10(x),
        y: roundToNearest10(y),
      });
    }
  }

  return newNodePositions;
}