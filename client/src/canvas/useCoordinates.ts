import type { Coordinate } from "@shape/types/utility";
import { onMounted, onUnmounted, ref, type Ref } from "vue";

export const useCoordinates = (canvas: Ref<HTMLCanvasElement | undefined>) => {
  const coords = ref<Coordinate>({ x: 0, y: 0 });

  const captureCoords = (ev: MouseEvent) => {
    coords.value = { x: ev.clientX, y: ev.clientY };
  }

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