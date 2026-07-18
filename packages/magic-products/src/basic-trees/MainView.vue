<script setup lang="ts">
  import { GraphProduct, useGraphProduct } from '@magic/shared/product';

  import AnimationTest from './AnimationTest.vue';
  import TreePanel from './TreePanel.vue';

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
    id: 'tree-panel',
    component: TreePanel,
    position: 'bottom-middle',
  });

  graph.magic.componentSlots.add({
    id: 'animation-tester',
    component: AnimationTest,
    position: 'top-middle',
  });
</script>

<template>
  <GraphProduct />
</template>
