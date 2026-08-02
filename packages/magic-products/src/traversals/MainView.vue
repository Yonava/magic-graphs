<script setup lang="ts">
  import { GraphProduct, useGraphProduct } from '@magic/shared/product';

  import ActionBar from './ActionBar.vue';
  import { lensChips } from './lensChips.ts';
  import { manifest } from './manifest.ts';

  const graph = useGraphProduct({
    manifest,
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

  graph.theme
    .createThemer({
      canvas: {
        'node.hover.color': 'blue',
      },
    })
    .activate();
</script>

<template>
  <GraphProduct />
</template>
