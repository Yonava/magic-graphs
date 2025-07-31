<script setup lang="ts">
  import { useGraphWithCanvas } from '@product/shared/useGraphWithCanvas';
  import GraphProduct from '@ui/product/GraphProduct.vue';

  import { DIJKSTRAS_GRAPH_SETTINGS } from './settings';
  import { isRunning } from './sim/runner';
  import CostDisplay from './ui/CostDisplay.vue';

  const graphWithCanvas = useGraphWithCanvas(DIJKSTRAS_GRAPH_SETTINGS);
</script>

<template>
  <GraphProduct v-bind="graphWithCanvas">
    <template #center-left-sim>
      <div class="bg-gray-800 bg-opacity-80 p-2 rounded-xl overflow-auto">
        <CostDisplay :key="String(isRunning)" />
      </div>
    </template>
  </GraphProduct>
</template>
