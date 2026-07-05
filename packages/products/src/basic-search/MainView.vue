<script setup lang="ts">
  import GraphProduct from '../shared/ui/general/GraphProduct.vue';
  import { useGraphWithCanvas } from '../shared/useGraphWithCanvas.ts';

  const graphWithCanvas = useGraphWithCanvas({
    core: {
      isGraphWeighted: false,
    },
  });
</script>

<template>
  <GraphProduct v-bind="graphWithCanvas" />
</template>
