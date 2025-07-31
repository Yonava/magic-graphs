<script setup lang="ts">
  import type { ProductInfo } from 'src/types';

  import ProductItem from './ProductItem.vue';

  defineProps<{
    products: Required<ProductInfo>[];
  }>();
</script>

<template>
  <div
    class="flex items-center justify-center gap-[100px] w-3/4 flex-wrap overflow-auto p-12"
  >
    <div v-for="product in products">
      <router-link :to="product.route.path">
        <ProductItem :product="product" />
      </router-link>
    </div>
  </div>
</template>
