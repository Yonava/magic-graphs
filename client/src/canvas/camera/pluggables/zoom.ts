import { onBeforeUnmount, onMounted, type Ref } from "vue";
import type { CameraPluggable, CameraState } from ".";

export const MIN_ZOOM = 0.5;
export const MAX_ZOOM = 5;
export const SENSITIVITY = 0.03;

export const useZoom: (state: CameraState) => CameraPluggable =
  ({ zoom, panX, panY }) =>
    (canvas: Ref<HTMLCanvasElement | undefined>) => {
      const onWheel = (ev: WheelEvent) => {
        if (!ev.ctrlKey || !canvas.value) return;
        ev.preventDefault();

        const { offsetX: cx, offsetY: cy } = ev;
        const zoomAmount = ev.deltaY * -SENSITIVITY;
        const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom.value + zoomAmount));
        const scale = newZoom / zoom.value;

        // Adjust pan so the zoom focuses on the cursor position
        panX.value = cx - (cx - panX.value) * scale;
        panY.value = cy - (cy - panY.value) * scale;

        zoom.value = newZoom;
      };

      onMounted(() => {
        if (!canvas.value) throw new Error("canvas not found in DOM");
        canvas.value.addEventListener("wheel", onWheel, { passive: false });
      });

      onBeforeUnmount(() => {
        if (!canvas.value) throw new Error("canvas not found in DOM");
        canvas.value.removeEventListener("wheel", onWheel);
      });

      return {
        getTransform: () => ({
          scaleX: zoom.value,
          scaleY: zoom.value,
          translateX: panX.value,
          translateY: panY.value,
        }),
      };
    };
