import { getMagicCoordinates } from '@magic/canvas/coordinates';
import { nonNullGraph as graph } from '@magic/products/shared/globalGraph';
import type { BoundingBox, Coordinate } from '@magic/shapes/types/utility';
import { getCtx } from '@magic/utils/ctx';
import { average } from '@magic/utils/math';

export const getAverageCoordinates = (coords: Coordinate[]) => {
  const { magicCanvas: canvas } = graph.value;

  const coordsInMiddleOfScreen = getMagicCoordinates(
    {
      clientX: window.innerWidth / 2,
      clientY: window.innerHeight / 2,
    },
    getCtx(canvas.canvas),
  );

  if (coords.length === 0) return coordsInMiddleOfScreen;

  return {
    x: average(coords.map((coord) => coord.x)),
    y: average(coords.map((coord) => coord.y)),
  };
};

export const centerNodesOnOriginCoordinates = <T extends Coordinate>(
  nodes: T[],
  targetOrigin: Coordinate,
) => {
  const averageCoordinates = getAverageCoordinates(nodes);

  const offsetX = targetOrigin.x - averageCoordinates.x;
  const offsetY = targetOrigin.y - averageCoordinates.y;

  for (const node of nodes) {
    node.x += offsetX;
    node.y += offsetY;
  }

  return nodes;
};

export const createImageFromCanvasRegion = (
  canvas: HTMLCanvasElement,
  boundingBox: BoundingBox,
) => {
  const { at, width, height } = boundingBox;
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = width;
  tempCanvas.height = height;
  const tempCtx = getCtx(tempCanvas);

  tempCtx.drawImage(
    canvas, // Source canvas
    at.x,
    at.y, // Source start x, y
    width,
    height, // Source width, height
    0,
    0, // Destination start x, y
    width,
    height, // Destination width, height
  );

  const dataURL = tempCanvas.toDataURL();

  tempCanvas.remove();

  return dataURL;
};
