<script setup lang="ts">
  import { GraphProduct, useGraphProduct } from '@magic/shared/product';

  import ToggleSimulation from './ToggleSimulation.vue';
  import { lensChips } from './lensChips.ts';

  const graph = useGraphProduct({
    productId: 'traversals',
    ui: {
      lensChips,
    },
  });

  graph.magic.componentSlots.add({
    id: 'toggle-sim',
    component: ToggleSimulation,
    position: 'top-right',
  });
</script>

<template>
  <GraphProduct />
</template>
