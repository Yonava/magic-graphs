<script setup lang="ts">
  import { GraphProduct, useGraphProduct } from '@magic/shared/product';

  import BottomMenu from './BottomMenu.vue';

  const graph = useGraphProduct();
  graph.magic.componentSlots.add({
    id: 'bottom-menu',
    component: BottomMenu,
    position: 'bottom-middle',
  });
</script>

<template>
  <GraphProduct />
</template>
