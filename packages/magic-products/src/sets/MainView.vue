<script setup lang="ts">
  import { GraphProduct, useGraphProduct } from '@magic/shared/product';

  useGraphProduct({
    productId: 'sets',
  });
</script>

<template>
  <GraphProduct />
</template>
