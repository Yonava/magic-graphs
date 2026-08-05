<script setup lang="ts">
  import { GraphProduct, useGraphProduct } from '@magic/shared/product';

  import { manifest } from './manifest.ts';

  useGraphProduct({
    manifest,
    core: {
      directed: false,
    },
    interactive: {
      allowSelfLoops: false,
    },
  });
</script>

<template>
  <GraphProduct />
</template>
