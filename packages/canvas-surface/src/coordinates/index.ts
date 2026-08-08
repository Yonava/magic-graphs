import { getCoordinates, getCtx } from '@core/utils/canvas/index';

import { type Ref, onMounted, ref } from 'vue';

import { Coordinate } from '../types.ts';

export const useCoordinates = (canvas: Ref<HTMLCanvasElement | undefined>) => {
  const coordinates = ref<Coordinate>({ x: 0, y: 0 });
  const captureCoords = (ev: MouseEvent) =>
    (coordinates.value = getCoordinates(ev, getCtx(canvas)));

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
