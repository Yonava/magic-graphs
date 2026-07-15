<script setup lang="ts">
  import { GraphProduct, useGraphProduct } from '@magic/shared/product';

  import BottomPanel from './BottomPanel.vue';

  const graph = useGraphProduct({
    interactive: {
      addedEdgeRuleNoSelfLoops: true,
      addedEdgeWeight: 0.5,
      addedEdgeRuleOneEdgePerPath: false,
    },
    ui: {
      annotations: true,
    },
  });

  graph.magic.componentSlots.add({
    id: 'panel',
    component: BottomPanel,
    position: 'bottom-middle',
  });
</script>

<template>
  <GraphProduct />
</template>
