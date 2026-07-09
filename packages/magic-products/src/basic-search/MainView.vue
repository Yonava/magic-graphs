<script setup lang="ts">
  import GraphProduct from '../shared/ui/general/GraphProduct.vue';
  import { useGraphWithCanvas } from '../shared/useGraphWithCanvas.ts';

  const graphWithCanvas = useGraphWithCanvas({
    core: {
      weighted: false,
    },
  });
</script>

<template>
  <GraphProduct v-bind="graphWithCanvas" />
</template>
