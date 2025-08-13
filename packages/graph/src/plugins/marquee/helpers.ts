import type { BaseGraph } from '../base';
import type { GNode } from '../types';
import type { BoundingBox } from '@magic/shapes/types/utility';

export const getEncapsulatedNodeBox = (
  nodes: GNode[],
  graph: BaseGraph,
): BoundingBox => {
  const encapsulatedNodeBox = {
    at: { x: Infinity, y: Infinity },
    width: 0,
    height: 0,
  };

  if (nodes.length < 2) return encapsulatedNodeBox;

  let minX = Infinity,
    minY = Infinity;
  let maxX = -Infinity,
    maxY = -Infinity;

  for (const node of nodes) {
    const nodeRadius = graph.getTheme('nodeSize', node);
    const nodeBorderWidth = graph.getTheme('nodeBorderWidth', node);
    const nodeArea = nodeRadius + nodeBorderWidth / 2;
    const { x, y } = node;

    minX = Math.min(minX, x - nodeArea);
    minY = Math.min(minY, y - nodeArea);
    maxX = Math.max(maxX, x + nodeArea);
    maxY = Math.max(maxY, y + nodeArea);
  }

  if (
    minX < Infinity &&
    minY < Infinity &&
    maxX > -Infinity &&
    maxY > -Infinity
  ) {
    encapsulatedNodeBox.at.x = minX;
    encapsulatedNodeBox.at.y = minY;
    encapsulatedNodeBox.width = maxX - minX;
    encapsulatedNodeBox.height = maxY - minY;
  } else {
    encapsulatedNodeBox.width = 0;
    encapsulatedNodeBox.height = 0;
  }

  return encapsulatedNodeBox;
};
