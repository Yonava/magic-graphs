<script setup lang="ts">
  import { ref, watch, computed, onUnmounted, onMounted } from 'vue';
  import { useElementSize } from '@vueuse/core';
  import { debounce } from '@utils/debounce';
  import { useClassAttrs } from '@ui/useClassAttrs';
  import { cross } from '@shapes';
  import type { Color } from '@colors';
  import { getCtx } from '@utils/ctx';
  import CoordinateIndicator from './CoordinateIndicator.vue';
  import { useCanvasCoords } from './useCanvasCoord';
  import { usePinchToZoom } from './usePinchToZoom';
  import { useCanvasCamera } from './useCanvasCamera';
  import { inDevMode } from '@graph/global';

  const canvasWidth = ref(0);
  const canvasHeight = ref(0);

  const loading = ref(true);

  const mainCanvasRef = ref<HTMLCanvasElement>();
  const bgCanvas = ref<HTMLCanvasElement>();

  const props = defineProps<{
    color: Color;
    patternColor: Color;
    /**
     * @default 5_000
     */
    canvasWidth?: number;
    /**
     * @default 3_000
     */
    canvasHeight?: number;
  }>();

  const widthProp = computed(() => props?.canvasWidth ?? 5_000);
  const heightProp = computed(() => props?.canvasHeight ?? 3_000);

  const emit = defineEmits<{
    (e: 'canvasRef', value: HTMLCanvasElement | undefined): void;
    (e: 'widthChange', value: number): void;
    (e: 'heightChange', value: number): void;
  }>();

  const DEFAULT_PARENT_CLASSES = [
    'w-full',
    'h-full',
    'relative',
    'overflow-auto',
  ];

  const callerClasses = useClassAttrs();
  const parentElClasses = computed(() => [
    ...DEFAULT_PARENT_CLASSES,
    ...callerClasses.value,
  ]);

  const emitRef = (el: HTMLCanvasElement | undefined) => {
    mainCanvasRef.value = el;
    emit('canvasRef', el);
  };

  const parentEl = ref<HTMLDivElement>();
  const { height: parentWidth, width: parentHeight } = useElementSize(parentEl);

  const { startPan, pan, endPan } = useCanvasCamera(parentEl);

  const setCanvasSize = () => {
    canvasWidth.value = widthProp.value;
    canvasHeight.value = heightProp.value;
  };

  const getParentEl = async () =>
    parentEl.value ??
    new Promise<HTMLDivElement>((res) => {
      const interval = setInterval(() => {
        if (!parentEl.value) return;
        clearInterval(interval);
        res(parentEl.value);
      }, 100);
    });

  const getBgCanvasCtx = async () =>
    new Promise<CanvasRenderingContext2D>((res) => {
      const interval = setInterval(() => {
        if (!bgCanvas.value) return;
        res(getCtx(bgCanvas.value));
        clearInterval(interval);
      }, 100);
    });

  const drawBackgroundPattern = async () => {
    const ctx = await getBgCanvasCtx();
    ctx.clearRect(0, 0, canvasWidth.value, canvasHeight.value);

    const RATE = 75;

    const drawCross = (x: number, y: number) => {
      cross({
        at: { x, y },
        size: 2,
        fillColor: props.patternColor,
      }).draw(ctx);
    };

    const w = canvasWidth.value;
    const h = canvasHeight.value;

    for (let x = RATE / 2; x < w; x += RATE) {
      for (let y = RATE / 2; y < h; y += RATE) drawCross(x, y);
    }
  };

  const debouncedDrawBackgroundPattern = debounce(drawBackgroundPattern, 250);

  const initCanvas = async () => {
    drawBackgroundPattern();
    const parentEl = await getParentEl();

    const middleY = canvasHeight.value / 2 - parentEl.clientHeight / 2;
    parentEl.scrollTop = middleY;

    const middleX = canvasWidth.value / 2 - parentEl.clientWidth / 2;
    parentEl.scrollLeft = middleX;

    loading.value = false;
  };

  initCanvas();

  watch(parentWidth, () => {
    setCanvasSize();
    drawBackgroundPattern();
    emit('widthChange', canvasWidth.value);
  });

  watch(parentHeight, () => {
    setCanvasSize();
    drawBackgroundPattern();
    emit('heightChange', canvasHeight.value);
  });

  watch([widthProp, heightProp], () => {
    setCanvasSize();
    drawBackgroundPattern();
    emit('widthChange', canvasWidth.value);
    emit('heightChange', canvasHeight.value);
  });

  watch(() => props.patternColor, drawBackgroundPattern);

  const coords = useCanvasCoords({
    canvasWidth,
    canvasHeight,
    getParentEl,
  });

  const controls = usePinchToZoom(mainCanvasRef);

  watch(controls.scale, () => {
    const { scale, origin } = controls;

    const bgCanvasCtx = getCtx(bgCanvas.value);

    bgCanvasCtx.clearRect(0, 0, canvasWidth.value, canvasHeight.value);
    bgCanvasCtx.resetTransform();
    bgCanvasCtx.translate(origin.value.x, origin.value.y);
    bgCanvasCtx.scale(scale.value, scale.value);

    debouncedDrawBackgroundPattern();
  });

  onMounted(() => {
    if (!parentEl.value) return;

    parentEl.value.addEventListener('mousedown', startPan);
    parentEl.value.addEventListener('mousemove', pan);
    parentEl.value.addEventListener('mouseup', endPan);
    parentEl.value.addEventListener('mouseleave', endPan);
    parentEl.value.addEventListener('contextmenu', (event) =>
      event.preventDefault(),
    );
  });

  onUnmounted(() => {
    if (!parentEl.value) return;

    parentEl.value.removeEventListener('mousedown', startPan);
    parentEl.value.removeEventListener('mousemove', pan);
    parentEl.value.removeEventListener('mouseup', endPan);
    parentEl.value.removeEventListener('mouseleave', endPan);
    parentEl.value.removeEventListener('contextmenu', (event) =>
      event.preventDefault(),
    );
  });
</script>

<template>
  <CoordinateIndicator
    v-if="inDevMode"
    :coords="coords"
  />
  <div
    ref="parentEl"
    id="responsive-canvas-container"
    :class="parentElClasses"
  >
    <!-- prevents canvas contents from jumping after the loading is completed -->
    <div
      v-if="loading"
      :style="{ backgroundColor: color }"
      class="absolute top-0 left-0 w-full h-full"
    ></div>

    <canvas
      :ref="emitRef as any"
      id="responsive-canvas"
      :width="canvasWidth"
      :height="canvasHeight"
      :class="[`w-[${canvasWidth}px]`, `h-[${canvasHeight}px]`]"
    ></canvas>

    <canvas
      ref="bgCanvas"
      :width="canvasWidth"
      :height="canvasHeight"
      :style="{ backgroundColor: color }"
      :class="[
        `w-[${canvasWidth}px]`,
        `h-[${canvasHeight}px]`,
        'absolute',
        'top-0',
        '-z-10',
        'pointer-events-none',
      ]"
    ></canvas>
  </div>
</template>
