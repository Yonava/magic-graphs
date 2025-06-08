import { onBeforeUnmount, onMounted, type Ref } from "vue";
import type { CameraPluggable, CameraState } from ".";

export const MIN_ZOOM = 0.5;
export const MAX_ZOOM = 5;
export const ZOOM_SENSITIVITY = 0.03;
export const PAN_SENSITIVITY = 1;

export const usePanAndZoom: (state: CameraState) => CameraPluggable =
  ({ zoom, panX, panY }) =>
    (canvas: Ref<HTMLCanvasElement | undefined>) => {
      const onWheel = (ev: WheelEvent) => {
        if (!canvas.value) return;
        ev.preventDefault();

        const isPanning = !ev.ctrlKey
        if (isPanning) {
          panX.value -= ev.deltaX * PAN_SENSITIVITY
          panY.value -= ev.deltaY * PAN_SENSITIVITY
          return
        }

        const { clientX: cx, clientY: cy } = ev;
        const zoomAmount = ev.deltaY * -ZOOM_SENSITIVITY;
        const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom.value + zoomAmount));
        const scale = newZoom / zoom.value;

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
