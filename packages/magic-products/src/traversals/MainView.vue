<script setup lang="ts">
  import { GraphProduct, useGraphProduct } from '@magic/shared/product';

  import BottomMenu from './BottomMenu.vue';

  useGraphProduct();
</script>

<template>
  <GraphProduct>
    <BottomMenu />
  </GraphProduct>
</template>
