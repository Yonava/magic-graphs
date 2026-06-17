import { CoreControls } from '@magic/graph/core/types';
import type { BoundingBox } from '@magic/shapes/types/utility';

import { CanvasControls } from '../canvas/types.ts';

export function getSurfaceArea(box: BoundingBox) {
  const { width, height } = box;
  return Math.abs(width * height);
}

export const getEncapsulatedNodeBox = (
  graph: CoreControls & { canvas: CanvasControls },
): BoundingBox => {
  const encapsulatedNodeBox = {
    at: { x: Infinity, y: Infinity },
    width: 0,
    height: 0,
  };

  if (graph.nodes.value.length < 2) return encapsulatedNodeBox;

  let minX = Infinity,
    minY = Infinity;
  let maxX = -Infinity,
    maxY = -Infinity;

  for (const node of graph.nodes.value) {
    const nodeRadius = graph.canvas.theme._resolveToken(
      'node.default.size',
      node,
    );
    const nodeBorderWidth = graph.canvas.theme._resolveToken(
      'node.default.borderWidth',
      node,
    );
    const nodeArea = nodeRadius + nodeBorderWidth / 2;
    const { x, y } = graph.positions.get(node.id);

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
