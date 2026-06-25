import { CoreControls } from '@magic/graph/core/types';
import type { BoundingBox } from '@magic/shapes/types/utility';

import { CanvasControls } from '../canvas/types.ts';
import { FocusControls } from '../focus/types.ts';

export function getSurfaceArea(box: BoundingBox) {
  const { width, height } = box;
  return Math.abs(width * height);
}

export const getSelectionBox = (
  graph: CoreControls & { canvas: CanvasControls; focus: FocusControls },
): BoundingBox => {
  const selectionBox = {
    at: { x: Infinity, y: Infinity },
    width: 0,
    height: 0,
  };

  if (graph.focus.focusedNodes.value.length < 2) return selectionBox;

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
      'node.default.border.width',
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
    selectionBox.at.x = minX;
    selectionBox.at.y = minY;
    selectionBox.width = maxX - minX;
    selectionBox.height = maxY - minY;
  } else {
    selectionBox.width = 0;
    selectionBox.height = 0;
  }

  return selectionBox;
};
