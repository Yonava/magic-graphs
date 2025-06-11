<script setup lang="ts">
  import GraphProduct from '@ui/product/GraphProduct.vue';
  import CostDisplay from './ui/CostDisplay.vue';
  import { DIJKSTRAS_GRAPH_SETTINGS } from './settings';
  import { isRunning } from './sim/runner';
  import { useGraphWithCanvas } from '@product/shared/useGraphWithCanvas';

  const graphWithCanvas = useGraphWithCanvas(DIJKSTRAS_GRAPH_SETTINGS);
</script>

<template>
  <GraphProduct v-bind="graphWithCanvas">
    <template #center-right-sim>
      <div class="bg-gray-800 bg-opacity-80 p-2 rounded-xl overflow-auto">
        <CostDisplay :key="String(isRunning)" />
      </div>
    </template>
  </GraphProduct>
</template>
