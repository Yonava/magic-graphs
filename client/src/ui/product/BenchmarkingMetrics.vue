<script setup lang="ts">
  import { useFPS } from '@utils/fps';

  const { fps, slowFrameCount, slowFrameRatio } = useFPS();
</script>

<template>
  <div class="text-white text-end">
    <div>FPS: {{ fps }}</div>
    <div>Slow Frame Count: {{ slowFrameCount }}</div>
    <div>Slow Frame Ratio: {{ slowFrameRatio.toFixed(2) }}</div>
  </div>
</template>
