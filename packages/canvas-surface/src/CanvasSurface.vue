<script setup lang="ts">
  import { type ClassNameValue, twMerge } from 'tailwind-merge';

  import { onBeforeUnmount, onMounted, ref } from 'vue';

  import type { CanvasProps } from './types.ts';

  const props = defineProps<CanvasProps['ref']>();

  const canvas = ref<HTMLCanvasElement>();

  onMounted(() => {
    if (!canvas.value)
      throw new Error('Canvas not found in DOM. Check ref link.');
    props.canvasRef(canvas.value);
  });

  onBeforeUnmount(() => {
    if (!canvas.value)
      throw new Error('Canvas not found in DOM. Check ref link.');
    props.cleanup(canvas.value);
  });
</script>

<template>
  <canvas
    v-bind="{
      ...$attrs,
      class: twMerge($attrs.class as ClassNameValue, ['w-screen', 'h-screen']),
    }"
    ref="canvas"
  >
    Sorry, your browser does not support canvas.
  </canvas>
</template>
