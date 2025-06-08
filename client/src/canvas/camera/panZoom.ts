import { getRawCoords } from "@canvas/useCoordinates";
import { onBeforeUnmount, onMounted, ref, type Ref } from "vue";

export const MIN_ZOOM = 0.5;
export const MAX_ZOOM = 5;
export const ZOOM_SENSITIVITY = 0.03;
export const PAN_SENSITIVITY = 1;

export const usePanAndZoom = (canvas: Ref<HTMLCanvasElement | undefined>) => {
  const panX = ref(0)
  const panY = ref(0)
  const zoom = ref(1)

  const executeZoom = (ev: WheelEvent) => {
    const { y: cx, x: cy } = getRawCoords(ev);
    const zoomAmount = ev.deltaY * -ZOOM_SENSITIVITY;
    const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom.value + zoomAmount));
    const scale = newZoom / zoom.value;

    panX.value = cx - (cx - panX.value) * scale;
    panY.value = cy - (cy - panY.value) * scale;
    zoom.value = newZoom;
  }

  const executePan = (ev: WheelEvent) => {
    panX.value -= ev.deltaX * PAN_SENSITIVITY
    panY.value -= ev.deltaY * PAN_SENSITIVITY
  }

  const onWheel = (ev: WheelEvent) => {
    if (!canvas.value) return;
    ev.preventDefault();

    const isPanning = !ev.ctrlKey;
    const maneuverCamera = isPanning ? executePan : executeZoom
    maneuverCamera(ev)
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
