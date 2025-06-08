<script setup lang="ts">
  import MagicCanvas from './MagicCanvas.vue';
  import { circle } from '@shapes';

  const draw = (ctx: CanvasRenderingContext2D) => {
    circle({
      radius: 50,
      at: { x: 100, y: 100 },
    }).draw(ctx);
  };
</script>

<template>
  <MagicCanvas
    @draw="draw"
    class="bg-gray-700"
  />
</template>
