<script setup lang="ts">
  import { GraphProduct, useGraphProduct } from '@magic/shared/product';

  import NodeMenu from './NodeMenu.vue';
  import { lensChips } from './lensChips.ts';

  const graph = useGraphProduct({
    productId: 'traversals',
    core: {
      weighted: false,
    },
    ui: {
      lensChips,
    },
  });

  graph.magic.componentSlots.add({
    id: 'node-menu',
    component: NodeMenu,
    position: 'bottom-middle',
  });
</script>

<template>
  <GraphProduct />
</template>
