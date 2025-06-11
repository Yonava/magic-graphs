<script setup lang="ts">
  import GraphProduct from '@ui/product/GraphProduct.vue';
  import { MST_GRAPH_SETTINGS } from './settings';
  import { useGraphWithCanvas } from '@product/shared/useGraphWithCanvas';

  const graphWithCanvas = useGraphWithCanvas(MST_GRAPH_SETTINGS);
</script>

<template>
  <GraphProduct v-bind="graphWithCanvas" />
</template>
