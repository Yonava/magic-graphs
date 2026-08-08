<script setup lang="ts">
  import { useGraphProduct } from '@magic/shared/product';
  import { MagicProduct } from '@magic/shared/product';

  const graph = useGraphProduct({
    productId: 'markov-chains',
  });
</script>

<template>
  <MagicProduct />
</template>
