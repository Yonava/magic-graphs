import { onBeforeUnmount, onMounted } from "vue";
import type { CameraPluggable, CameraState } from ".";

export const usePan: (state: CameraState) => CameraPluggable = ({ panX, panY }) => (canvas) => {
  const SENSITIVITY = 5

  const onWheel = (ev: WheelEvent) => {
    ev.preventDefault();

    panX.value -= ev.deltaX * SENSITIVITY
    panY.value -= ev.deltaY * SENSITIVITY
  };

  onMounted(() => {
    if (!canvas.value) throw new Error("canvas not found in DOM");
    canvas.value.addEventListener('wheel', onWheel, { passive: false })
  })

  onBeforeUnmount(() => {
    if (!canvas.value) throw new Error("canvas not found in DOM");
    canvas.value.removeEventListener('wheel', onWheel)
  })

  return {
    getTransform: () => ({ translateX: panX.value, translateY: panY.value })
  }
}