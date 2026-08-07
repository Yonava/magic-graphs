<script setup lang="ts">
  import { GraphProduct, useGraphProduct } from '@magic/shared/product';

  import ActionBar from './ActionBar.vue';

  const graph = useGraphProduct({
    productId: 'path-finding',
    interactive: {
      allowSelfLoops: false,
      allowRepeatConnections: true,
    },
    ui: {
      annotations: true,
    },
  });

  graph.magic.componentSlots.add({
    id: 'action-bar',
    component: ActionBar,
    position: 'bottom-middle',
  });
</script>

<template>
  <GraphProduct />
</template>
