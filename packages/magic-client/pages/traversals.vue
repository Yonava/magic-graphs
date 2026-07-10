<script setup lang="ts">
  import { initTraversalsProduct } from '@magic/products/traversals/index';

  const product = initTraversalsProduct();

  useSeoMeta({
    title: product.meta.title,
    description: product.meta.description,
  });
</script>

<template>
  <div><component :is="product.component" /></div>
</template>
