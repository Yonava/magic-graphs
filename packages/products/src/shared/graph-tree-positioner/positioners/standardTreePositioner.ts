import { NodePositionUpdate } from '@graph/core/positions/types';
import { roundToNearestN } from '@magic/utils/math';
import { getValue } from '@magic/utils/maybeGetter/index';

import { TreeGraphPositioner } from './types.ts';

export const standardTreePositioner: TreeGraphPositioner = ({
  nodeDepths,
  rootNode,
  treeFormationOptions,
  graph,
}) => {
  const { xOffset, yOffset, rootNodeCoordinates } = treeFormationOptions;
  const newRootNodePosition = getValue(rootNodeCoordinates, rootNode);

  const newNodePositions: NodePositionUpdate[] = [
    { nodeId: rootNode.id, update: newRootNodePosition },
  ];

  const { depthToNodeIds } = nodeDepths;
  const roundToNearest10 = roundToNearestN(10);

  for (let i = 1; i < depthToNodeIds.length; i++) {
    const nodeIds = depthToNodeIds[i];
    const xOffsetPerNode = [];

    const hasMiddleNode = nodeIds.length % 2 === 1;
    if (hasMiddleNode) {
      const middleNodeIndex = Math.floor(nodeIds.length / 2);
      xOffsetPerNode[middleNodeIndex] = 0;

      for (let j = 1; j <= middleNodeIndex; j++) {
        xOffsetPerNode[middleNodeIndex + j] = j * xOffset;
        xOffsetPerNode[middleNodeIndex - j] = -j * xOffset;
      }
    } else {
      for (let j = 0; j < nodeIds.length; j++) {
        xOffsetPerNode[j] = (j - nodeIds.length / 2 + 0.5) * xOffset;
      }
    }

    for (let j = 0; j < nodeIds.length; j++) {
      const node = graph.getNode(nodeIds[j]);
      if (!node) throw new Error(`node with id ${nodeIds[j]} not found`);

      const x = newRootNodePosition.x + xOffsetPerNode[j];
      const y = newRootNodePosition.y + yOffset * i;

      newNodePositions.push({
        nodeId: node.id,
        update: {
          x: roundToNearest10(x),
          y: roundToNearest10(y),
        },
      });
    }
  }

  return newNodePositions;
};
