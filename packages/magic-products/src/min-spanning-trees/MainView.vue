<script setup lang="ts">
  import {
    GraphProduct,
    manifests,
    useGraphProduct,
  } from '@magic/shared/product';

  import { lensChips } from './lensChips.ts';

  useGraphProduct({
    manifest: manifests['min-spanning-trees'],
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
