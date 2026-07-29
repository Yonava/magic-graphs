<script setup lang="ts">
  import { GraphProduct, useGraphProduct } from '@magic/shared/product';

  import ActionBar from './ActionBar.vue';
  import { manifest } from './manifest.ts';

  const graph = useGraphProduct({
    manifest,
    interactive: {
      addedEdgeRuleNoSelfLoops: true,
      addedEdgeRuleOneEdgePerPath: false,
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
