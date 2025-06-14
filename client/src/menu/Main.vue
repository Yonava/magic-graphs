<script setup lang="ts">
  import { ref } from 'vue';
  import type { ProductInfo } from 'src/types';
  import ProductCatalog from './ProductCatalog.vue';

  const infoModules = import.meta.glob<{
    default: ProductInfo;
  }>('/src/**/info.ts', { eager: true });

  const productInfos = Object.values(infoModules).map((m) => m.default);

  // pull all products we can display on the main menu
  const products = ref(
    productInfos.filter((info) => info?.menu) as Required<ProductInfo>[],
  );
</script>

<template>
  <div
    class="w-full h-full relative flex items-center justify-center flex-col bg-gradient-to-tl to-purple-100 from-gray-50 dark:to-gray-900 dark:via-gray-900 dark:from-purple-900 text-gray-800 dark:text-gray-50"
  >
    <div class="mb-10 text-center">
      <h1
        class="font-black text-7xl bg-gradient-to-tr dark:from-purple-700 dark:to-orange-600 from-purple-500 to-orange-500 text-transparent bg-clip-text p-4"
      >
        Magic Graphs
      </h1>
      <h3 class="font-bold text-2xl">Select An Experience</h3>
    </div>

    <ProductCatalog :products="products" />
  </div>
</template>
