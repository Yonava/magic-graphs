import { ref, onMounted, onUnmounted } from 'vue';
import type { Ref } from 'vue';
import { getCtx } from '@utils/ctx';

export const MIN_SCALE = 0.5;
export const MAX_SCALE = 5;

export function usePinchToZoom(canvasRef: Ref<HTMLCanvasElement | undefined | null>) {
  const scale = ref(1);
  const zoomOrigin = ref({ x: 0, y: 0 });

  const handleWheel = (ev: WheelEvent) => {
    if (!ev.ctrlKey) return
    ev.preventDefault();
    const canvas = canvasRef.value;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const cursorX = ev.clientX - rect.left;
    const cursorY = ev.clientY - rect.top;

    const scaleChange = ev.deltaY < 0 ? 1.03 : 0.97;
    const newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale.value * scaleChange));

    zoomOrigin.value.x = cursorX - (cursorX - zoomOrigin.value.x) * (newScale / scale.value);
    zoomOrigin.value.y = cursorY - (cursorY - zoomOrigin.value.y) * (newScale / scale.value);

    scale.value = newScale;
    console.log(zoomOrigin.value)
    applyZoom();
  };

  const applyZoom = () => {
    const ctx = getCtx(canvasRef);
    ctx.resetTransform();
    ctx.translate(zoomOrigin.value.x, zoomOrigin.value.y);
    ctx.scale(scale.value, scale.value);
  };

  onMounted(() => {
    const canvas = canvasRef.value;
    if (!canvas) throw new Error('Canvas ref is not defined');
    canvas.addEventListener('wheel', handleWheel, { passive: false });
  });

  onUnmounted(() => {
    const canvas = canvasRef.value;
    if (!canvas) return;
    canvas.removeEventListener('wheel', handleWheel);
  });

  return {
    scale,
    origin: zoomOrigin,
  };
}
