<script setup lang="ts">
  import { getCtx } from '@utils/ctx';
  import { onMounted, ref } from 'vue';
  import { twMerge, type ClassNameValue } from 'tailwind-merge';

  const emit = defineEmits<{
    (e: 'canvasRef', value: HTMLCanvasElement): void;
  }>();

  const canvas = ref<HTMLCanvasElement>();

  onMounted(() => {
    if (!canvas.value) {
      throw new Error('Canvas not found in DOM. Check ref link.');
    }

    const ctx = getCtx(canvas);

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.value.getBoundingClientRect();

    canvas.value.width = rect.width * dpr;
    canvas.value.height = rect.height * dpr;

    canvas.value.style.width = `${rect.width}px`;
    canvas.value.style.height = `${rect.height}px`;

    ctx.scale(dpr, dpr);

    emit('canvasRef', canvas.value);
  });
</script>

<template>
  <div class="absolute top-0 left-0 m-2">
    {{ canvas?.width }} - {{ canvas?.height }}
  </div>
  <canvas
    v-bind="{
      ...$attrs,
      class: twMerge($attrs.class as ClassNameValue, ['w-full', 'h-full']),
    }"
    ref="canvas"
  ></canvas>
</template>
