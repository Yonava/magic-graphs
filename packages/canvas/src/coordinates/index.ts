import { Coordinate } from '@magic/shapes/types/utility';
import { getDevicePixelRatio } from '../camera/utils';
import { getCtx } from '@magic/utils/ctx'

import { type Ref, onMounted, ref } from 'vue';

export const getCanvasTransform = (ctx: CanvasRenderingContext2D) => {
  const { a, e, f } = ctx.getTransform();
  // TODO investigate why dpr isn't already factored into ctx. Camera should add it with the PZ transform!
  const dpr = getDevicePixelRatio();
  const zoom = a / dpr;
  const panX = e / dpr;
  const panY = f / dpr;
  return { panX, panY, zoom };
};

/**
 * the coordinates in the real world. aka the browser
 */
export type ClientCoords = Pick<MouseEvent, 'clientX' | 'clientY'>;

/**
 * the coordinates in the magic canvas world
 */
export type MagicCoords = Coordinate;

export type WithZoom<T> = T & {
  /**
   * the scale factor of the canvas
   */
  zoom: number;
};

/**
 * magic coordinates are coordinates transformed by the pan and zoom of the camera.
 *
 * if the user has panned their camera 10px to the left, running this function with
 * `clientCoords` set to (0, 0) will return (-10, 0, 1)
 */
export const getMagicCoordinates = (
  clientCoords: ClientCoords,
  ctx: CanvasRenderingContext2D,
): WithZoom<MagicCoords> => {
  const rect = ctx.canvas.getBoundingClientRect();
  const localX = clientCoords.clientX - rect.left;
  const localY = clientCoords.clientY - rect.top;

  const { panX, panY, zoom } = getCanvasTransform(ctx);

  const x = (localX - panX) / zoom;
  const y = (localY - panY) / zoom;

  return { x, y, zoom };
};

/**
 * client coordinates are the raw coordinates corresponding to the clients physical screen.
 *
 * the top left corner is (0, 0) and bottom right corner is (window.innerWidth, window.innerHeight).
 */
export const getClientCoordinates = (
  magicCoords: MagicCoords,
  ctx: CanvasRenderingContext2D,
): WithZoom<ClientCoords> => {
  const { panX, panY, zoom } = getCanvasTransform(ctx);
  const { x, y } = magicCoords;

  return {
    clientX: x * zoom + panX,
    clientY: y * zoom + panY,
    zoom,
  };
};

export const useMagicCoordinates = (
  canvas: Ref<HTMLCanvasElement | undefined>,
) => {
  const coordinates = ref<MagicCoords>({ x: 0, y: 0 });
  const captureCoords = (ev: MouseEvent) =>
    (coordinates.value = getMagicCoordinates(ev, getCtx(canvas)));

  onMounted(() => {
    if (!canvas.value)
      throw new Error('Canvas not found in DOM. Check ref link.');
    canvas.value.addEventListener('mousemove', captureCoords);
    canvas.value.addEventListener('wheel', captureCoords);
  });

  return {
    coordinates,
    cleanup: (ref: HTMLCanvasElement) => {
      ref.removeEventListener('mousemove', captureCoords);
      ref.removeEventListener('wheel', captureCoords);
    },
  };
};
