<script setup lang="ts">
  import CIcon from '@ui/core/Icon.vue';
  import GWell from '@ui/graph/GWell.vue';
  import GButton from '@ui/graph/button/GButton.vue';
  import GVerticalCardButton from '@ui/graph/button/GVerticalCardButton.vue';
  import {
    getCurrentProduct,
    isExternal,
    useProductRouting,
  } from '@utils/product';
  import type { ProductInfoWithMenu } from '@utils/product';
  import { getRandomInRange } from '@utils/random';

  import { computed, ref } from 'vue';

  const { navigate, navigateWithGraph } = useProductRouting();
  const currentProduct = getCurrentProduct();

  const props = defineProps<{
    product: ProductInfoWithMenu;
  }>();

  const hovered = ref(false);

  const img = ref('');
  setTimeout(
    () => {
      img.value = props.product.menu.thumbnail;
    },
    getRandomInRange(0, 100),
  );

  const allowGoWithGraph = computed(() => {
    const goWithGraph = props.product.menu.allowGoWithGraph ?? true;
    return !isExternal(props.product) && goWithGraph;
  });
</script>

<template>
  <div
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
    class="relative"
  >
    <div
      class="absolute w-full h-full z-10 grid place-items-center transition duration-200"
      :style="{
        opacity: hovered ? 1 : 0,
      }"
    >
      <div
        v-if="currentProduct.productId !== product.productId"
        class="flex items-center gap-3"
      >
        <GButton
          @click="navigate(product)"
          tertiary
          class="grid place-items-center w-[120px] text-sm"
        >
          <CIcon icon="arrow-right"></CIcon>
          go
        </GButton>
        <GButton
          v-if="allowGoWithGraph"
          @click="navigateWithGraph(product)"
          tertiary
          class="grid place-items-center w-[120px] text-sm"
        >
          <CIcon icon="debug-step-over"></CIcon>
          go with graph
        </GButton>
      </div>
      <GWell
        v-else
        tertiary
        class="flex items-center gap-2 px-2 py-1 rounded-md text-xl font-bold overflow-hidden"
      >
        <CIcon
          icon="star"
          class="text-xl"
        />
        you are here
        <CIcon
          icon="star"
          class="text-xl"
        />
      </GWell>
    </div>
    <GVerticalCardButton
      :image-src="img"
      :title="product.menu.name"
      :description="product.menu.description"
      class="rounded-md"
      :style="{
        opacity: hovered ? 0.5 : 1,
      }"
    />
  </div>
</template>
