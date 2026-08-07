<script setup lang="ts">
  import { useGraphProduct } from '@magic/shared/product';
  import GraphProduct from '@magic/shared/product/GraphProduct.vue';

  const graph = useGraphProduct({
    productId: 'markov-chains',
  });
</script>

<template>
  <GraphProduct />
</template>
