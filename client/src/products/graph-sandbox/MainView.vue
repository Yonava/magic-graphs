<script setup lang="ts">
  import { ref } from 'vue';
  import { useGraph } from '@graph/useGraph';
  import GraphProduct from '@ui/product/GraphProduct.vue';
  import { SANDBOX_GRAPH_SETTINGS } from './settings';
  import IslandToolbar from './ui/IslandToolbar.vue';
  import IslandMarkup from './ui/IslandMarkup.vue';
  import { useMarkupColorizer } from './theme/useMarkupColorizer';
  import { useMarkupSizer } from './theme/useMarkupSizer';

  const graphEl = ref<HTMLCanvasElement>();
  const graph = useGraph(graphEl, SANDBOX_GRAPH_SETTINGS);

  const { colorize, colorMap } = useMarkupColorizer(graph);
  colorize();

  const { size, sizeMap } = useMarkupSizer(graph);
  size();
</script>

<template>
  <GraphProduct
    @graph-ref="(el) => (graphEl = el)"
    :graph="graph"
  >
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
