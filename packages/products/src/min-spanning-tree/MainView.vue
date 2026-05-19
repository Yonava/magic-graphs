<script setup lang="ts">
  import GraphProduct from '../shared/ui/general/GraphProduct.vue';
  import { useGraphWithCanvas } from '../shared/useGraphWithCanvas';
  import { MST_GRAPH_SETTINGS } from './settings';

  const graphWithCanvas = useGraphWithCanvas(MST_GRAPH_SETTINGS);
</script>

<template>
  <GraphProduct v-bind="graphWithCanvas" />
</template>
