<script setup lang="ts">
  import { initPathFindingProduct } from '@magic/products/path-finding/index';

  const product = initPathFindingProduct();

  useSeoMeta({
    title: product.meta.title,
    description: product.meta.description,
  });
</script>

<template>
  <div><component :is="product.component" /></div>
</template>
