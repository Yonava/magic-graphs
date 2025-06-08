import { onMounted, onUnmounted, ref, type Ref } from "vue";
import type { CameraPluggable } from ".";

export const MIN_SCALE = 0.5;
export const MAX_SCALE = 5;
export const SENSITIVITY = 0.03

export const useZoom: CameraPluggable = (canvas: Ref<HTMLCanvasElement | undefined>) => {
  const zoom = ref(1);

  const onWheel = (ev: WheelEvent) => {
    if (!ev.ctrlKey) return;
    ev.preventDefault();

    if (!canvas.value) return;

    const scaleChange = 1 + (ev.deltaY < 0 ? SENSITIVITY : -SENSITIVITY);
    const newScale = zoom.value * scaleChange;
    if (newScale <= MIN_SCALE || newScale >= MAX_SCALE) return;

    zoom.value = newScale;
  };

  onMounted(() => {
    if (!canvas.value) throw new Error('canvas not found in DOM')
    canvas.value.addEventListener('wheel', onWheel)
  })

  onUnmounted(() => {
    if (!canvas.value) throw new Error('canvas not found in DOM')
    canvas.value.removeEventListener('wheel', onWheel)
  })

  return {
    getTransform: () => ({ scaleX: zoom.value, scaleY: zoom.value })
  }
}