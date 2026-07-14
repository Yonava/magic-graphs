<script setup lang="ts">
  import { GraphProduct, useGraphProduct } from '@magic/shared/product';

  import BottomMenu from './BottomMenu.vue';

  const graph = useGraphProduct();

  graph.magic.componentSlots.addMany([
    {
      id: 'bottom-menu',
      component: BottomMenu,
      position: 'bottom-middle',
    },
    {
      id: 'bottom-menu',
      component: BottomMenu,
      position: 'bottom-middle',
    },
    {
      id: 'bottom-menu-removal',
      component: BottomMenu,
      position: 'bottom-middle',
    },
  ]);

  setTimeout(() => {
    graph.magic.componentSlots.remove('bottom-menu-removal');
  }, 3_000);
</script>

<template>
  <GraphProduct />
</template>
