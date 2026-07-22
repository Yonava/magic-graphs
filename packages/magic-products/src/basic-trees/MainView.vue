<script setup lang="ts">
  import { GraphProduct, useGraphProduct } from '@magic/shared/product';

  import FocusedNodeMenu from './FocusedNodeMenu.vue';

  const graph = useGraphProduct({
    productId: 'basic-trees',
    localStorage: false,
    core: {
      weighted: false,
    },
    ui: {
      annotations: true,
      debug: true,
    },
  });

  graph.magic.componentSlots.add({
    id: 'focused-node-menu',
    component: FocusedNodeMenu,
    position: 'bottom-middle',
  });

  graph.anchors.lifecycle.disable();
  graph.nodeDrag.lifecycle.disable();
  graph.interactive.lifecycle.disable();
</script>

<template>
  <GraphProduct />
</template>
