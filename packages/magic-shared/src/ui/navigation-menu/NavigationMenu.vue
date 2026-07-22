<script setup lang="ts">
  import { cn } from '@core/components/cn';
  import { nullThrows } from '@core/utils/assert';
  import { navigateTo } from 'nuxt/app';

  import Button from '../../components/button/Button.vue';
  import Dropdown from '../../components/dropdown/Dropdown.vue';
  import DropdownItem from '../../components/dropdown/DropdownItem.vue';
  import HStack from '../../components/layout/HStack.vue';
  import VStack from '../../components/layout/VStack.vue';
  import Well from '../../components/layout/Well.vue';
  import { Thumbnail } from '../../product/manifest.ts';
  import { useProvidedGraph } from '../../product/useProvidedGraph.ts';
  import { useThemeToClasses } from '../../useThemeToClasses.ts';
  import { products } from './productList.ts';

  const graph = useProvidedGraph();

  const imageUriFromThumbnail = (thumbnail: Thumbnail) => {
    const presetName = graph.theme.activePresetName.value;
    return thumbnail[presetName];
  };

  const descriptionClasses = useThemeToClasses({
    dark: 'text-gray-300',
    light: 'text-gray-800',
  });

  const activeProduct = nullThrows(
    products.find((product) => graph.magic.manifest.id === product.id),
    'product id not recognized',
  );
</script>

<template>
  <Dropdown>
    <template #trigger>
      <Well class="p-0">
        <Button class="bg-transparent text-xl p-2 px-4 text-magic">
          {{ activeProduct.name }}
        </Button>
      </Well>
    </template>
    <Well class="p-1 bg-transparent">
      <VStack>
        <template
          v-for="product in products"
          :key="product.id"
        >
          <DropdownItem @click="navigateTo(`/${product.slug}`)">
            <Button class="rounded-lg p-2 w-84 bg-transparent">
              <HStack class="gap-4 items-start">
                <img
                  :src="imageUriFromThumbnail(product.thumbnail)"
                  :alt="product.name"
                  class="w-20 h-20 object-cover rounded-md"
                />
                <VStack class="text-left gap-1">
                  <h1 class="font-bold text-lg">
                    {{ product.name }}
                  </h1>
                  <p :class="cn('text-sm font-light', descriptionClasses)">
                    {{ product.description }}
                  </p>
                </VStack>
              </HStack>
            </Button>
          </DropdownItem>
        </template>
      </VStack>
    </Well>
  </Dropdown>
</template>
