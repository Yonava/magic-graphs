<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { twMerge, type ClassNameValue } from 'tailwind-merge';
  import { useCoordinates } from './useCoordinates';
  import { initCanvas } from './initCanvas';

  const emit = defineEmits<{
    (e: 'canvasRef', value: HTMLCanvasElement): void;
  }>();

  const canvas = ref<HTMLCanvasElement>();
  const coords = useCoordinates(canvas);

  onMounted(() => {
    if (!canvas.value) {
      throw new Error('Canvas not found in DOM. Check ref link.');
    }

    initCanvas(canvas.value);
    emit('canvasRef', canvas.value);
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
