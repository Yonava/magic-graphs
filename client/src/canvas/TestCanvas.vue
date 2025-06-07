<script setup lang="ts">
  import MagicCanvas from './MagicCanvas.vue';
  import { circle } from '@shapes';

  const drawFn = (ctx: CanvasRenderingContext2D) => {
    circle({
      radius: 50,
      at: { x: 100, y: 100 },
    }).draw(ctx);
  };
</script>

<template>
  <MagicCanvas
    :draw="drawFn"
    class="bg-red-200"
  />
</template>
