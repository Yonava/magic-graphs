<script setup lang="ts">
import { useGraphWithCanvas } from "../shared/useGraphWithCanvas";
import GraphProduct from "../shared/ui/general/GraphProduct.vue";

import { AST_GRAPH_SETTINGS } from "./settings";

const graphWithCanvas = useGraphWithCanvas(AST_GRAPH_SETTINGS);
</script>

<template>
  <GraphProduct v-bind="graphWithCanvas" />
</template>
