<script setup lang="ts">
  import GraphProduct from '@ui/product/GraphProduct.vue';
  import { BASIC_SEARCH_GRAPH_SETTINGS } from './settings';
  import { useGraphWithCanvas } from '@product/shared/useGraphWithCanvas';

  const graphWithCanvas = useGraphWithCanvas(BASIC_SEARCH_GRAPH_SETTINGS);
</script>

<template>
  <GraphProduct v-bind="graphWithCanvas" />
</template>
