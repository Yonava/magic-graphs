<script setup lang="ts">
  import GWell from "@magic/products/shared/ui/graph-core/GWell.vue";
  import { PRODUCT_CATEGORY_RANK, products } from "@magic/products/utils";
  import type {
    ProductCategory,
    ProductInfoWithMenu,
  } from "@magic/products/utils";
  import { devMode } from "@magic/products/shared/globalGraph";

  import ProductItem from "./ProductItem.vue";
  import { computed } from "vue";

  const productsWithMenu = products.filter(
    (info) => info?.menu
  ) as ProductInfoWithMenu[];

  const categoryRecord = PRODUCT_CATEGORY_RANK.reduce((acc, category) => {
    acc[category] = [];
    return acc;
  }, {} as Record<ProductCategory, ProductInfoWithMenu[]>);

  productsWithMenu.forEach((product) => {
    categoryRecord[product.menu.category].push(product);
  });

  const productCategories = computed(() => {
    return devMode.value
      ? PRODUCT_CATEGORY_RANK
      : PRODUCT_CATEGORY_RANK.filter((cat) => cat !== "developer tools");
  });
</script>

<template>
  <GWell class="flex flex-col p-2 w-[400px] h-[500px] overflow-auto rounded-lg">
    <div
      v-for="category in productCategories"
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
