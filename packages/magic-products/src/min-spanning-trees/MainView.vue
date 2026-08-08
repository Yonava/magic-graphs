<script setup lang="ts">
  import { MagicProduct, useGraphProduct } from '@magic/shared/product';

  import { lensChips } from './lensChips.ts';

  useGraphProduct({
    productId: 'min-spanning-trees',
    core: {
      directed: false,
    },
    interactive: {
      allowSelfLoops: false,
    },
    lensChips,
  });
</script>

<template>
  <MagicProduct />
</template>
