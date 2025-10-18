<script setup lang="ts">
import { useFPS } from "@magic/utils/fps";
import GText from "../../graph-core/GText.vue";

const { fps, slowFrameCount, slowFrameRatio } = useFPS();
</script>

<template>
  <GText class="text-end">
    <div>FPS: {{ fps }}</div>
    <div>Slow Frame Count: {{ slowFrameCount }}</div>
    <div>Slow Frame Ratio: {{ slowFrameRatio.toFixed(2) }}</div>
  </GText>
</template>
