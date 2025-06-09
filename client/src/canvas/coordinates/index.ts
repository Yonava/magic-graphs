import type { Coordinate } from "@shape/types/utility";
import { getCtx } from "@utils/ctx";
import { onMounted, ref, type Ref } from "vue";
import type { Camera } from "../camera";

export const getMagicCoordinates = (
  ev: MouseEvent,
  ctx: CanvasRenderingContext2D,
  cameraState: Camera['state'],
) => {
  const rect = ctx.canvas.getBoundingClientRect();
  const localX = ev.clientX - rect.left;
  const localY = ev.clientY - rect.top;

  const { panX, panY, zoom } = cameraState;

  const x = Math.round((localX - panX.value) / zoom.value);
  const y = Math.round((localY - panY.value) / zoom.value);

  return { x, y };
}

export const useMagicCoordinates = (
  canvas: Ref<HTMLCanvasElement | undefined>,
  cameraState: Camera['state']
) => {
  const coordinates = ref<Coordinate>({ x: 0, y: 0 });
  const captureCoords = (ev: MouseEvent) => coordinates.value = getMagicCoordinates(
    ev,
    getCtx(canvas),
    cameraState
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