<script setup lang="ts">
  import { onBeforeUnmount, onMounted, ref } from 'vue';
  import { twMerge, type ClassNameValue } from 'tailwind-merge';
  import { initCanvas } from './initCanvas';
  import { getCtx } from '@utils/ctx';
  // import Button from '@ui/core/button/Button.vue';
  // import { MAX_ZOOM, MIN_ZOOM } from './camera/panZoom';
  import type { MagicCanvasProps } from './useMagicCanvas';

  const props = defineProps<MagicCanvasProps>();

  const emit = defineEmits<{
    (e: 'draw', value: CanvasRenderingContext2D): void;
  }>();

  const canvas = ref<HTMLCanvasElement>();

  let repaintInterval: NodeJS.Timeout;
  const REPAINT_FPS = 60;

  const repaintCanvas = () => {
    const ctx = getCtx(canvas);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    props.camera.transform(ctx);
    emit('draw', ctx);
  };

  onMounted(() => {
    if (!canvas.value) {
      throw new Error('Canvas not found in DOM. Check ref link.');
    }

    initCanvas(canvas.value);
    props.canvasRef(canvas.value);
    repaintInterval = setInterval(repaintCanvas, 1000 / REPAINT_FPS);
  });

  onBeforeUnmount(() => {
    console.log('unmounting magic', canvas.value ?? 'not here');
    if (!canvas.value) {
      throw new Error('Canvas not found in DOM. Check ref link.');
    }

    clearInterval(repaintInterval);
    props.cleanup(canvas.value);
  });
</script>

<template>
  <!-- <div class="absolute top-0 left-0 m-2 flex gap-2">
    <Button
      @click="camera.actions.zoomIn()"
      :disabled="MAX_ZOOM === camera.state.zoom.value"
      >Zoom In</Button
    >
    <Button
      @click="camera.actions.zoomOut()"
      :disabled="MIN_ZOOM === camera.state.zoom.value"
      >Zoom Out</Button
    >
  </div>
  <div
    class="absolute top-0 right-0 m-2 text-white pointer-events-none flex flex-col gap-2 text-right"
  >
    <span>
      Cursor At: ({{ coordinates.value.x }}, {{ coordinates.value.y }})
    </span>
    <span>
      PanX: {{ camera.state.panX }} / PanY {{ camera.state.panY }} / Zoom:
      {{ camera.state.zoom }}
    </span>
  </div> -->
  <canvas
    v-bind="{
      ...$attrs,
      class: twMerge($attrs.class as ClassNameValue, ['w-full', 'h-full']),
    }"
    ref="canvas"
  ></canvas>
</template>
