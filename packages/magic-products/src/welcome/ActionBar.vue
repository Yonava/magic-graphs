<script setup lang="ts">
  import Button from '@magic/shared/Button';
  import HStack from '@magic/shared/HStack';
  import VStack from '@magic/shared/VStack';
  import Well from '@magic/shared/Well';
  import { useProvidedGraph } from '@magic/shared/product';
  import { navigateToProduct } from '@magic/shared/ui/index';
  import { useThemeToClasses } from '@magic/shared/useThemeToClasses';

  import { computed } from 'vue';

  import { featuredProducts } from './scene.ts';
  import { useWelcomeScene } from './useWelcomeScene.ts';

  const graph = useProvidedGraph();
  const { activeProduct } = useWelcomeScene();

  const thumbnail = computed(() => {
    if (!activeProduct.value) return;
    return activeProduct.value.thumbnail[graph.theme.activePresetName.value];
  });

  const mutedClasses = useThemeToClasses({
    dark: 'text-gray-300',
    light: 'text-gray-700',
  });
</script>

<template>
  <Well class="w-184 p-3 select-none">
    <HStack
      v-if="activeProduct"
      class="gap-4"
    >
      <img
        :src="thumbnail"
        :alt="activeProduct.name"
        class="h-16 w-16 rounded-md object-cover"
      />
      <VStack class="flex-1 gap-1 text-left">
        <h2 class="text-lg font-bold">{{ activeProduct.name }}</h2>
        <p :class="`text-sm font-light ${mutedClasses}`">
          {{ activeProduct.description }}
        </p>
      </VStack>
      <Button
        @click="navigateToProduct(activeProduct)"
        class="bg-magic h-16 px-6 text-lg text-white"
      >
        Open
        <template #end>
          <span class="pl-1">&rarr;</span>
        </template>
      </Button>
    </HStack>

    <VStack
      v-else
      class="items-center gap-0.5 px-4"
    >
      <p class="text-xl font-bold">
        {{ featuredProducts.length }} experiences are sitting on this canvas.
        Pick a colored node.
      </p>
    </VStack>
  </Well>
</template>
