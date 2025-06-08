import type { Ref } from 'vue';
import { getDevicePixelRatio } from '@canvas/camera/utils'
import { computed, onMounted, onUnmounted, ref } from 'vue';

/**
 * gets the canvas coordinates with a mouse event on a *potentially* transformed canvas
 */
export const getCanvasCoords = (
  ev: MouseEvent,
  ctx: CanvasRenderingContext2D,
) => {
  const transform = ctx.getTransform();
  const invertedTransform = transform.inverse();
  const { offsetX, offsetY } = ev;
  const dpr = getDevicePixelRatio()
  return {
    x:
      (invertedTransform.a * offsetX +
        invertedTransform.c * offsetY +
        invertedTransform.e) * dpr,
    y:
      (invertedTransform.b * offsetX +
        invertedTransform.d * offsetY +
        invertedTransform.f) * dpr,
    scale: transform.a,
  };
};

export const getCanvasScale = (ctx: CanvasRenderingContext2D) => {
  const transform = ctx.getTransform();
  return transform.a;
};

/**
 * reactive coordinates for the responsive canvas that track over the mouse position
 *
 * @param {Ref<number>} canvasWidth the width of the canvas
 * @param {Ref<number>} canvasHeight the height of the canvas
 * @param {() => Promise<HTMLElement>} getParentEl a function that returns the parent element of the canvas
 * @returns {CanvasCoords} the reactive coordinates of the canvas
 * @example const { canvasCoords, humanCoords } = useCanvasCoords({ canvasWidth, canvasHeight, getParentEl });
 */
export const useCanvasCoords = ({
  canvasWidth,
  canvasHeight,
  getParentEl,
}: {
  canvasWidth: Ref<number>;
  canvasHeight: Ref<number>;
  getParentEl: () => Promise<HTMLElement>;
}) => {
  const mousePos = ref({ x: 0, y: 0 });
  const canvasCoords = ref({ x: 0, y: 0 });

  const updateMousePos = (ev: MouseEvent) => {
    mousePos.value = { x: ev.clientX, y: ev.clientY };
    updateCanvasCoords();
  };

  const updateCanvasCoords = async () => {
    const parentEl = await getParentEl();

    const { x: mouseOffsetX, y: mouseOffsetY } = mousePos.value;
    const { scrollLeft, scrollTop } = parentEl;

    canvasCoords.value.x = scrollLeft + mouseOffsetX;
    canvasCoords.value.y = scrollTop + mouseOffsetY;
  };

  onMounted(async () => {
    const parentEl = await getParentEl();
    parentEl.addEventListener('mousemove', updateMousePos);
    parentEl.addEventListener('scroll', updateCanvasCoords);
  });

  onUnmounted(async () => {
    const parentEl = await getParentEl();
    parentEl.removeEventListener('mousemove', updateMousePos);
    parentEl.removeEventListener('scroll', updateCanvasCoords);
  });

  return {
    canvasCoords,
    humanCoords: computed(() => ({
      x: canvasCoords.value.x - canvasWidth.value / 2,
      y: (canvasCoords.value.y - canvasHeight.value / 2) * -1,
    })),
  };
};

export type CanvasCoords = ReturnType<typeof useCanvasCoords>;
