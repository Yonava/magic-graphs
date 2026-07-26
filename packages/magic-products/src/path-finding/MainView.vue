<script setup lang="ts">
  import { GraphProduct, useGraphProduct } from '@magic/shared/product';

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
</script>

<template>
  <GraphProduct />
</template>
