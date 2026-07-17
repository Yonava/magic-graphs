<script setup lang="ts">
  import { GraphProduct, useGraphProduct } from '@magic/shared/product';

  import TreePanel from './TreePanel.vue';

  const graph = useGraphProduct({
    productId: 'basic-trees',
    core: {
      weighted: false,
    },
    ui: {
      annotations: true,
    },
  });

  graph.magic.componentSlots.add({
    id: 'tree-panel',
    component: TreePanel,
    position: 'bottom-middle',
  });
</script>

<template>
  <GraphProduct />
</template>
