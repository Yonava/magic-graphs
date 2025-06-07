<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from 'vue';
  import { twMerge, type ClassNameValue } from 'tailwind-merge';
  import { useCoordinates } from './useCoordinates';
  import { initCanvas } from './initCanvas';
  import { usePan } from './useCanvasCamera';
  import { getCtx } from '@utils/ctx';

  const props = defineProps<{
    draw: (ctx: CanvasRenderingContext2D) => void;
  }>();

  const emit = defineEmits<{
    (e: 'canvasRef', value: HTMLCanvasElement): void;
  }>();

  const canvas = ref<HTMLCanvasElement>();
  const coords = useCoordinates(canvas);
  const camera = usePan(canvas);

  let repaintInterval: NodeJS.Timeout;
  const REPAINT_FPS = 60;

  const repaintCanvas = () => {
    const ctx = getCtx(canvas);
    camera.clear(ctx);
    camera.applyTransform(ctx);
    props.draw(ctx);
  };

  onMounted(() => {
    if (!canvas.value) {
      throw new Error('Canvas not found in DOM. Check ref link.');
    }

    initCanvas(canvas.value);
    emit('canvasRef', canvas.value);
    repaintInterval = setInterval(repaintCanvas, 1000 / REPAINT_FPS);

    canvas.value.addEventListener('wheel', (ev) => {
      console.log('wheel', [ev.deltaX, ev.deltaY, ev.deltaZ]);
    });
  });

  onUnmounted(() => {
    clearInterval(repaintInterval);
  });
</script>

<template>
  <div class="absolute top-0 left-0 m-2 pointer-events-none">
    Raw: ({{ coords.raw.coords.value.x }}, {{ coords.raw.coords.value.y }}) /
    Norm: ({{ coords.normal.coords.value.x }},
    {{ coords.normal.coords.value.y }})
  </div>
  <canvas
    v-bind="{
      ...$attrs,
      class: twMerge($attrs.class as ClassNameValue, ['w-full', 'h-full']),
    }"
    ref="canvas"
  ></canvas>
</template>

<style scoped>
  html,
  body {
    margin: 0;
    padding: 0;
    overflow: hidden;
    overscroll-behavior: none;
    height: 100%;
  }
  canvas {
    display: block;
  }
</style>
