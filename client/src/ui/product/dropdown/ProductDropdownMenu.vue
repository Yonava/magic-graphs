<script setup lang="ts">
  import GWell from '@ui/graph/GWell.vue';
  import { PRODUCT_CATEGORY_RANK, products } from '@utils/product';
  import type { ProductCategory, ProductInfoWithMenu } from '@utils/product';

  import ProductItem from './ProductItem.vue';

  const productsWithMenu = products.filter(
    (info) => info?.menu,
  ) as ProductInfoWithMenu[];

  const categoryRecord = PRODUCT_CATEGORY_RANK.reduce(
    (acc, category) => {
      acc[category] = [];
      return acc;
    },
    {} as Record<ProductCategory, ProductInfoWithMenu[]>,
  );

  productsWithMenu.forEach((product) => {
    categoryRecord[product.menu.category].push(product);
  });
</script>

<template>
  <GWell class="flex flex-col p-2 w-[400px] h-[500px] overflow-auto rounded-lg">
    <div
      v-for="category in PRODUCT_CATEGORY_RANK"
      :key="category"
    >
      <GWell
        v-if="categoryRecord[category].length > 0"
        tertiary
        class="text-xl font-bold capitalize my-2 text-center p-1 rounded-md"
      >
        {{ category }}
      </GWell>
      <div class="flex flex-col gap-2">
        <ProductItem
          v-for="product in categoryRecord[category]"
          :key="product.productId"
          :product="product"
        />
      </div>
    </div>
  </GWell>
</template>
