<script setup lang="ts">
  import {
    GraphProduct,
    manifests,
    useGraphProduct,
  } from '@magic/shared/product';

  import ActionBar from './ActionBar.vue';
  import { lensChips } from './lensChips.ts';

  const graph = useGraphProduct({
    manifest: manifests['traversals'],
    core: {
      weighted: false,
    },
    interactive: {
      allowSelfLoops: false,
    },
    ui: {
      lensChips,
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
