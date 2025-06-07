<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { twMerge, type ClassNameValue } from 'tailwind-merge';
  import { useCoordinates } from './useCoordinates';
  import { initCanvas } from './initCanvas';
  import { useCanvasCamera } from './useCanvasCamera';
  import { getCtx } from '@utils/ctx';

  const props = defineProps<{
    draw: () => void;
  }>();

  const emit = defineEmits<{
    (e: 'canvasRef', value: HTMLCanvasElement): void;
  }>();

  const canvas = ref<HTMLCanvasElement>();
  const coords = useCoordinates(canvas);
  const camera = useCanvasCamera(canvas);

  onMounted(() => {
    if (!canvas.value) {
      throw new Error('Canvas not found in DOM. Check ref link.');
    }

    initCanvas(canvas.value);
    emit('canvasRef', canvas.value);

    setInterval(() => {
      const ctx = getCtx(canvas);
      camera.clear(ctx);
      camera.applyTransform(ctx);
      props.draw();
    }, 1000 / 60);
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
