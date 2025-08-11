import type { GNode } from '@graph/types';

export const circularLayout = (nodes: GNode[], radius: number) => {
  const angleStep = (2 * Math.PI) / nodes.length;
  const circularNodes = nodes.map((node, index) => ({
    ...node,
    x: Math.cos(angleStep * index) * radius * 7,
    y: Math.sin(angleStep * index) * radius * 7,
  }));
  return circularNodes;
};

export const gridLayout = (nodes: GNode[], cellSize: number) => {
  const gridSize = Math.ceil(Math.sqrt(nodes.length));

  const gridNodes = nodes.map((node, index) => {
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;
    return {
      ...node,
      x: col * cellSize + cellSize / 2, // Center in the cell
      y: row * cellSize + cellSize / 2, // Center in the cell
    };
  });
  return gridNodes;
};
