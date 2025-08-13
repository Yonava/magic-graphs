<script setup lang="ts">
  import { useGraphWithCanvas } from "../shared/useGraphWithCanvas";
  import GraphProduct from "@magic/ui/product/GraphProduct.vue";

  import { BASIC_SEARCH_GRAPH_SETTINGS } from "./settings";

  const graphWithCanvas = useGraphWithCanvas(BASIC_SEARCH_GRAPH_SETTINGS);
</script>

<template>
  <GraphProduct v-bind="graphWithCanvas" />
</template>
