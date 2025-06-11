<script setup lang="ts">
  import GraphProduct from '@ui/product/GraphProduct.vue';
  import { SANDBOX_GRAPH_SETTINGS } from './settings';
  import IslandToolbar from './ui/IslandToolbar.vue';
  import IslandMarkup from './ui/IslandMarkup.vue';
  import { useMarkupColorizer } from './theme/useMarkupColorizer';
  import { useMarkupSizer } from './theme/useMarkupSizer';
  import { useGraphWithCanvas } from '@product/shared/useGraphWithCanvas';

  const graphWithCanvas = useGraphWithCanvas(SANDBOX_GRAPH_SETTINGS);
  const { graph } = graphWithCanvas;

  const { colorize, colorMap } = useMarkupColorizer(graph);
  colorize();

  const { size, sizeMap } = useMarkupSizer(graph);
  size();
</script>

<template>
  <GraphProduct v-bind="graphWithCanvas">
    <template #top-center>
      <IslandToolbar />
    </template>

    <template #center-left>
      <IslandMarkup
        v-show="!graph.annotation.isActive.value"
        :graph="graph"
        :size-map="sizeMap"
        :color-map="colorMap"
      />
    </template>
  </GraphProduct>
</template>
