<script setup lang="ts">
  import { ref } from 'vue';
  import MagicCanvas from './MagicCanvas.vue';
  import { circle } from '@shapes';
  import { getCtx } from '@utils/ctx';

  const canvas = ref<HTMLCanvasElement>();

  const drawFn = () => {
    const ctx = getCtx(canvas);

    circle({
      radius: 50,
      at: { x: 100, y: 100 },
    }).draw(ctx);
  };
</script>

<template>
  <MagicCanvas
    @canvas-ref="(ev) => (canvas = ev)"
    :draw="drawFn"
    class="bg-red-200"
  />
</template>
