<script setup lang="ts">
  import { useGraphWithCanvas } from "../shared/useGraphWithCanvas";
  import GraphProduct from "@magic/products/shared/ui/general/GraphProduct.vue";

  import { MST_GRAPH_SETTINGS } from "./settings";

  const graphWithCanvas = useGraphWithCanvas(MST_GRAPH_SETTINGS);
</script>

<template>
  <GraphProduct v-bind="graphWithCanvas" />
</template>
