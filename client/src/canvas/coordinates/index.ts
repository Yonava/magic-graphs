import type { Coordinate } from "@shape/types/utility";
import { getCtx } from "@utils/ctx";
import { onMounted, ref, type Ref } from "vue";
import { getDevicePixelRatio } from "@canvas/camera/utils";

export const getCanvasTransform = (ctx: CanvasRenderingContext2D) => {
  const { a, e, f } = ctx.getTransform();
  // TODO investigate why dpr isn't already factored into ctx. Camera should add it with the PZ transform!
  const dpr = getDevicePixelRatio()
  const zoom = a / dpr;
  const panX = e / dpr;
  const panY = f / dpr;
  return { panX, panY, zoom };
};

/**
 * the coordinates in the real world. aka the browser
 */
export type ClientCoords = Pick<MouseEvent, 'clientX' | 'clientY'>

/**
 * the coordinates in the magic canvas world
 */
export type MagicCoords = Coordinate

export const getMagicCoordinates = (clientCoords: ClientCoords, ctx: CanvasRenderingContext2D) => {
  const rect = ctx.canvas.getBoundingClientRect();
  const localX = clientCoords.clientX - rect.left;
  const localY = clientCoords.clientY - rect.top;

  const { panX, panY, zoom } = getCanvasTransform(ctx);

  const x = Number(((localX - panX) / zoom).toFixed(2));
  const y = Number(((localY - panY) / zoom).toFixed(2));

  return { x, y, zoom };
}

export const getClientCoordinates = (magicCoords: MagicCoords, ctx: CanvasRenderingContext2D) => {
  const { panX, panY, zoom } = getCanvasTransform(ctx);
  const { x, y } = magicCoords;

  return {
    clientX: Number((x * zoom + panX).toFixed(2)),
    clientY: Number((y * zoom + panY).toFixed(2)),
    zoom,
  };
};

export const useMagicCoordinates = (canvas: Ref<HTMLCanvasElement | undefined>) => {
  const coordinates = ref<MagicCoords>({ x: 0, y: 0 });
  const captureCoords = (ev: MouseEvent) => coordinates.value = getMagicCoordinates(
    ev,
    getCtx(canvas),
  )

  onMounted(() => {
    if (!canvas.value) throw new Error('Canvas not found in DOM. Check ref link.');
    canvas.value.addEventListener('mousemove', captureCoords)
    canvas.value.addEventListener('wheel', captureCoords)
  })

  return {
    coordinates,
    cleanup: (ref: HTMLCanvasElement) => {
      ref.removeEventListener('mousemove', captureCoords)
      ref.removeEventListener('wheel', captureCoords)
    },
  }
}