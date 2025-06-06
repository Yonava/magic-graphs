import type { Coordinate } from "@shape/types/utility";
import { getCtx } from "@utils/ctx";
import { onMounted, onUnmounted, ref, type Ref } from "vue";

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
  })

  onUnmounted(() => {
    if (!canvas.value) {
      throw new Error('Canvas not found in DOM')
    }

    canvas.value.removeEventListener('mousemove', captureCoords)
  })

  return { coords }
}

const getRawCoords: CoordGetter = (ev) => ({ x: ev.clientX, y: ev.clientY })

const getNormalizedCoords: CoordGetter = (ev, ctx) => {
  const transform = ctx.getTransform();
  const invertedTransform = transform.inverse();
  const { offsetX, offsetY } = ev;
  return {
    x:
      invertedTransform.a * offsetX +
      invertedTransform.c * offsetY +
      invertedTransform.e,
    y:
      invertedTransform.b * offsetX +
      invertedTransform.d * offsetY +
      invertedTransform.f,
    scale: transform.a,
  };
};

export const useCoordinates = (canvas: Ref<HTMLCanvasElement | undefined>) => ({
  raw: useCoordinatesBase(canvas, getRawCoords),
  normal: useCoordinatesBase(canvas, getNormalizedCoords),
})
