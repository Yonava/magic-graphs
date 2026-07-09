<script setup lang="ts">
  import GraphProduct from '../shared/ui/general/GraphProduct.vue';
  import { useGraphWithCanvas } from '../shared/useGraphWithCanvas.ts';
  import IslandToolbar from './ui/IslandToolbar.vue';

  const graphWithCanvas = useGraphWithCanvas();
</script>

<template>
  <GraphProduct v-bind="graphWithCanvas">
    <template #top-center>
      <IslandToolbar />
    </template>
  </GraphProduct>
</template>
