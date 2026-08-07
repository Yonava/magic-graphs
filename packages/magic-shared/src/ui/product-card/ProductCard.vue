<script setup lang="ts">
  import { cn } from '@core/components/cn';

  import { computed } from 'vue';

  import HStack from '../../components/layout/HStack.vue';
  import VStack from '../../components/layout/VStack.vue';
  import { MagicProductNavigation } from '../../product/manifest.ts';
  import { useProvidedGraph } from '../../product/useProvidedGraph.ts';
  import { useThemeToClasses } from '../../useThemeToClasses.ts';

  const props = defineProps<{ product: MagicProductNavigation }>();

  const graph = useProvidedGraph();

  const thumbnail = computed(
    () => props.product.card.thumbnail[graph.theme.activePresetName.value],
  );

  const descriptionClasses = useThemeToClasses({
    dark: 'text-gray-300',
    light: 'text-gray-800',
  });
</script>

<template>
  <HStack class="w-84 items-start gap-4">
    <img
      :src="thumbnail"
      :alt="product.card.name"
      class="h-20 w-20 rounded-md object-cover"
    />
    <VStack class="gap-1 text-left">
      <h1 class="text-lg font-bold">{{ product.card.name }}</h1>
      <p :class="cn('text-sm font-light', descriptionClasses)">
        {{ product.card.description }}
      </p>
    </VStack>
  </HStack>
</template>
