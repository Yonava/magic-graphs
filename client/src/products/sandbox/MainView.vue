<script setup lang="ts">
  import { useGraphWithCanvas } from '@product/shared/useGraphWithCanvas';
  import GraphProduct from '@ui/product/GraphProduct.vue';

  import { SANDBOX_GRAPH_SETTINGS } from './settings';
  import IslandToolbar from './ui/IslandToolbar.vue';

  const graphWithCanvas = useGraphWithCanvas(SANDBOX_GRAPH_SETTINGS);
</script>

<template>
  <GraphProduct v-bind="graphWithCanvas">
    <template #top-center>
      <IslandToolbar />
    </template>
  </GraphProduct>
</template>
