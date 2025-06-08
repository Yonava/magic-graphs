import type { Coordinate } from "@shape/types/utility";
import { getCtx } from "@utils/ctx";
import { onMounted, onUnmounted, ref, type Ref } from "vue";
import { getDevicePixelRatio } from "./camera/utils";

type CoordGetter = (ev: MouseEvent, ctx: CanvasRenderingContext2D) => Coordinate

export const useCoordinatesBase = (
  canvas: Ref<HTMLCanvasElement | undefined>,
  coordGetter: CoordGetter,
) => {
  const coords = ref<Coordinate>({ x: 0, y: 0 });
  const captureCoords = (ev: MouseEvent) => coords.value = coordGetter(ev, getCtx(canvas))

  onMounted(() => {
    if (!canvas.value) {
      throw new Error('Canvas not found in DOM')
    }

    canvas.value.addEventListener('mousemove', captureCoords)
    canvas.value.addEventListener('wheel', captureCoords)
  })

  onUnmounted(() => {
    if (!canvas.value) {
      throw new Error('Canvas not found in DOM')
    }

    canvas.value.removeEventListener('mousemove', captureCoords)
    canvas.value.removeEventListener('wheel', captureCoords)
  })

  return { coords }
}

const getRawCoords: CoordGetter = (ev) => ({ x: ev.clientX, y: ev.clientY })

const getNormalizedCoords: CoordGetter = (ev, ctx) => {
  const transform = ctx.getTransform();
  const invertedTransform = transform.inverse();
  const { clientX, clientY } = ev;
  const dpr = getDevicePixelRatio()
  return {
    x:
      (invertedTransform.a * clientX +
        invertedTransform.c * clientY +
        invertedTransform.e) * dpr,
    y:
      (invertedTransform.b * clientX +
        invertedTransform.d * clientY +
        invertedTransform.f) * dpr,
    scale: transform.a,
  };
};

export const useCoordinates = (canvas: Ref<HTMLCanvasElement | undefined>) => ({
  raw: useCoordinatesBase(canvas, getRawCoords),
  normal: useCoordinatesBase(canvas, getNormalizedCoords),
})
