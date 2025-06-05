import type { BoundingBox, Coordinate } from '@shape/types/utility';
import { getCtx } from '@utils/ctx';
import { average } from '@utils/math';
import { getCanvasCoords } from '@utils/components/useCanvasCoord';
import { nonNullGraph as graph } from '@graph/global';

export const getAverageCoordinates = (coords: Coordinate[]) => {
  const { canvas } = graph.value;
  const ctx = getCtx(canvas);

  const rect = canvas.value?.getBoundingClientRect();
  const screenCenter = {
    x: window.innerWidth / 2 - (rect?.left || 0),
    y: window.innerHeight / 2 - (rect?.top || 0),
  };

  const mouseEvent = new MouseEvent('mousemove', {
    clientX: screenCenter.x,
    clientY: screenCenter.y,
  });

  const { x: defaultX, y: defaultY } = getCanvasCoords(mouseEvent, ctx);

  if (coords.length === 0) return { x: defaultX, y: defaultY };

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
