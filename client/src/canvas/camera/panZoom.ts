import { onMounted, ref, type Ref } from "vue";

export const MIN_ZOOM = 0.2;
export const MAX_ZOOM = 10;

export const ZOOM_SENSITIVITY = 0.02;
export const PAN_SENSITIVITY = 1;

export const usePanAndZoom = (canvas: Ref<HTMLCanvasElement | undefined>) => {
  const panX = ref(0)
  const panY = ref(0)
  const zoom = ref(1)

  const setZoom = (ev: Pick<WheelEvent, 'clientX' | 'clientY' | 'deltaY'>) => {
    const { clientX: cx, clientY: cy } = ev

    const zoomFactor = Math.exp(-ev.deltaY * ZOOM_SENSITIVITY);
    const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom.value * zoomFactor));

    const scale = newZoom / zoom.value;

    panX.value = Math.round(cx - (cx - panX.value) * scale);
    panY.value = Math.round(cy - (cy - panY.value) * scale);
    zoom.value = newZoom
  }

  const setPan = (ev: Pick<WheelEvent, 'deltaX' | 'deltaY'>) => {
    panX.value -= Math.round(ev.deltaX * PAN_SENSITIVITY)
    panY.value -= Math.round(ev.deltaY * PAN_SENSITIVITY)
  }

  const onWheel = (ev: WheelEvent) => {
    ev.preventDefault();

    const isPanning = !ev.ctrlKey;
    const maneuverCamera = isPanning ? setPan : setZoom
    maneuverCamera(ev)
  };

  let lastX = 0;
  let lastY = 0;
  let middleMouseDown = false;

  const onMousedown = (ev: MouseEvent) => {
    middleMouseDown = ev.button === 1

    lastX = ev.clientX
    lastY = ev.clientY
  }

  const onMousemove = (ev: MouseEvent) => {
    if (!middleMouseDown) return
    setPan({ deltaX: lastX - ev.clientX, deltaY: lastY - ev.clientY })
    lastX = ev.clientX
    lastY = ev.clientY
  }

  const onMouseup = () => {
    lastX = 0
    lastY = 0
    middleMouseDown = false
  }

  onMounted(() => {
    if (!canvas.value) throw new Error("canvas not found in DOM");
    canvas.value.addEventListener("wheel", onWheel, { passive: false });
    canvas.value.addEventListener("mousedown", onMousedown)
    canvas.value.addEventListener("mousemove", onMousemove)
    document.addEventListener('mouseup', onMouseup)
  });

  return {
    actions: {
      zoomIn: (increment = 12.5) => setZoom({
        deltaY: -increment,
        clientX: window.innerWidth / 2,
        clientY: window.innerHeight / 2
      }),
      zoomOut: (decrement = 12.5) => setZoom({
        deltaY: decrement,
        clientX: window.innerWidth / 2,
        clientY: window.innerHeight / 2
      }),
    },
    state: {
      panX,
      panY,
      zoom,
    },
    getTransform: () => ({
      scaleX: zoom.value,
      scaleY: zoom.value,
      translateX: panX.value,
      translateY: panY.value,
    }),
    cleanup: (ref: HTMLCanvasElement) => {
      ref.removeEventListener("wheel", onWheel);
      ref.addEventListener("mousedown", onMousedown)
      ref.addEventListener("mousemove", onMousemove)
      document.addEventListener('mouseup', onMouseup)
    }
  };
};
