<script setup lang="ts">
  import { GraphProduct, useGraphProduct } from '@magic/shared/product';

  import NodeMenu from './NodeMenu.vue';
  import { lensChips } from './lensChips.ts';
  import { manifest } from './manifest.ts';

  const graph = useGraphProduct({
    manifest,
    core: {
      weighted: false,
    },
    interactive: {
      addedEdgeRuleNoSelfLoops: true,
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
