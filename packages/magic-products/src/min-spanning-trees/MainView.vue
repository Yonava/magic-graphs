<script setup lang="ts">
  import { GraphProduct, useGraphProduct } from '@magic/shared/product';

  import { lensChips } from './lensChips.ts';
  import { manifest } from './manifest.ts';

  useGraphProduct({
    manifest,
    core: {
      directed: false,
    },
    interactive: {
      allowSelfLoops: false,
    },
    ui: {
      lensChips,
    },
  });

  // graph.magic.componentSlots.add({
  //   component: ActiveMST,
  //   id: 'mst-viewer',
  //   position: 'bottom-middle',
  // });
</script>

<template>
  <GraphProduct />
</template>
