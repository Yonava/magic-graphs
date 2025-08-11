<script setup lang="ts">
  import { type ClassNameValue, twMerge } from 'tailwind-merge';

  import { onBeforeUnmount, onMounted, ref } from 'vue';

  import type { MagicCanvasProps } from './types';

  const props = defineProps<MagicCanvasProps['ref']>();

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
      class: twMerge($attrs.class as ClassNameValue, ['w-full', 'h-full']),
    }"
    ref="canvas"
  ></canvas>
</template>
