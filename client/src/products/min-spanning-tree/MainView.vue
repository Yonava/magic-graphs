<script setup lang="ts">
  import { useGraphWithCanvas } from '@product/shared/useGraphWithCanvas';
  import GraphProduct from '@ui/product/GraphProduct.vue';

  import { MST_GRAPH_SETTINGS } from './settings';

  const graphWithCanvas = useGraphWithCanvas(MST_GRAPH_SETTINGS);
</script>

<template>
  <GraphProduct v-bind="graphWithCanvas" />
</template>
