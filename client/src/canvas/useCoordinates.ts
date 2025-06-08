import type { Coordinate } from "@shape/types/utility";
import { getCtx } from "@utils/ctx";
import { onBeforeUnmount, onMounted, ref, type Ref } from "vue";
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

  onBeforeUnmount(() => {
    if (!canvas.value) {
      throw new Error('Canvas not found in DOM')
    }

    canvas.value.removeEventListener('mousemove', captureCoords)
    canvas.value.removeEventListener('wheel', captureCoords)
  })

  return { coords }
}

export const getRawCoords = (ev: MouseEvent) => ({ x: ev.clientX, y: ev.clientY })

export const getNormalizedCoords = (ev: MouseEvent, ctx: CanvasRenderingContext2D) => {
  const transform = ctx.getTransform();
  const invertedTransform = transform.inverse();
  const { clientX, clientY } = ev;
  const dpr = getDevicePixelRatio()

  const x = (invertedTransform.a * clientX + invertedTransform.c * clientY + invertedTransform.e) * dpr
  const y = (invertedTransform.b * clientX + invertedTransform.d * clientY + invertedTransform.f) * dpr

  return {
    x: Math.round(x),
    y: Math.round(y),
    scale: transform.a,
  };
};

export const useCoordinates = (canvas: Ref<HTMLCanvasElement | undefined>) => ({
  raw: useCoordinatesBase(canvas, getRawCoords),
  normal: useCoordinatesBase(canvas, getNormalizedCoords),
})
