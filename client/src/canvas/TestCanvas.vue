<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import MagicCanvas from './MagicCanvas.vue';
  import { circle } from '@shapes';
  import { getCtx } from '@utils/ctx';

  const canvas = ref<HTMLCanvasElement>();

  onMounted(() => {
    const ctx = getCtx(canvas);

    circle({
      radius: 50,
      at: { x: 100, y: 100 },
    }).draw(ctx);
  });
</script>

<template>
  <MagicCanvas
    @canvas-ref="(ev) => (canvas = ev)"
    class="bg-red-200"
  />
</template>
