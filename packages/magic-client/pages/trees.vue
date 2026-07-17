<script setup lang="ts">
  import { initTreesProduct } from '@magic/products/basic-trees/index';

  const product = initTreesProduct();

  useSeoMeta({
    title: product.meta.title,
    description: product.meta.description,
  });
</script>

<template>
  <div><component :is="product.component" /></div>
</template>
