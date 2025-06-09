import { ref, onMounted, onUnmounted, watch } from 'vue';
import type { Ref } from 'vue';
import { getCtx } from '@utils/ctx';

export const MIN_SCALE = 0.5;
export const MAX_SCALE = 5;
export const scale = ref(1);
export const DEFAULT_SCALE_JUMP = 0.1;

/**
 * @param scaleChange
 * @default DEFAULT_SCALE_JUMP
 */
export const setScale = (scaleChange = DEFAULT_SCALE_JUMP) => {
  scale.value = Math.max(
    Math.min(Math.round((scale.value + scaleChange) * 1000) / 1000, MAX_SCALE),
    MIN_SCALE,
  );
};

export const zoomIn = (scaleChange = DEFAULT_SCALE_JUMP) => {
  setScale(scaleChange)
}

export const zoomOut = (scaleChange = -DEFAULT_SCALE_JUMP) => {
  setScale(scaleChange)
}

export const setZoomByPercentage = (zoomPercent: number) => {
  scale.value = Math.min(
    MAX_SCALE,
    Math.max(MIN_SCALE, zoomPercent / 100),
  );
}

export const usePinchToZoom = (
  canvasRef: Ref<HTMLCanvasElement | undefined | null>,
) => {
  const zoomOrigin = ref({ x: 0, y: 0 });
  let isScrolling = false;

  const handleWheel = (ev: WheelEvent) => {
    if (!ev.ctrlKey) return;
    ev.preventDefault();
    isScrolling = true;

    const canvas = canvasRef.value;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();

    const cursorX = ev.clientX - rect.left;
    const cursorY = ev.clientY - rect.top;

    const scaleChange = ev.deltaY < 0 ? 1.03 : 0.97;
    const newScale = Math.min(
      MAX_SCALE,
      Math.max(MIN_SCALE, scale.value * scaleChange),
    );
    if (newScale <= MIN_SCALE || newScale >= MAX_SCALE) return;

    zoomOrigin.value.x =
      cursorX - (cursorX - zoomOrigin.value.x) * (newScale / scale.value);
    zoomOrigin.value.y =
      cursorY - (cursorY - zoomOrigin.value.y) * (newScale / scale.value);

    scale.value = newScale;

    console.log(zoomOrigin.value)
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

  watch(scale, (newScale, oldScale) => {
    const canvas = canvasRef.value;
    if (!canvas) return;

    if (!isScrolling) {
      const rect = canvas.getBoundingClientRect();
      const screenCenterX = window.innerWidth / 2;
      const screenCenterY = window.innerHeight / 2;

      const canvasX = screenCenterX - rect.left;
      const canvasY = screenCenterY - rect.top;

      zoomOrigin.value.x =
        canvasX - (canvasX - zoomOrigin.value.x) * (scale.value / oldScale);
      zoomOrigin.value.y =
        canvasY - (canvasY - zoomOrigin.value.y) * (scale.value / oldScale);
    }

    applyZoom();

    isScrolling = false;
  });

  return {
    scale,
    origin: zoomOrigin,
  };
};
