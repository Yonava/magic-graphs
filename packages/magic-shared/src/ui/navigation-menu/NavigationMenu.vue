<script setup lang="ts">
  import { cn } from '@core/components/cn';
  import { navigateTo } from 'nuxt/app';

  import Button from '../../components/button/Button.vue';
  import Dropdown from '../../components/dropdown/Dropdown.vue';
  import DropdownItem from '../../components/dropdown/DropdownItem.vue';
  import HStack from '../../components/layout/HStack.vue';
  import VStack from '../../components/layout/VStack.vue';
  import Well from '../../components/layout/Well.vue';
  import { ThemePreset } from '../../graph/types.ts';
  import { useProvidedGraph } from '../../product/useProvidedGraph.ts';
  import { useThemeToClasses } from '../../useThemeToClasses.ts';

  type Thumbnail = Record<ThemePreset, string>;

  type Product = {
    id: string;
    name: string;
    description: string;
    thumbnail: Thumbnail;
    slug: string;
  };

  const products: Product[] = [
    {
      id: 'avl-trees',
      name: 'AVL Trees',
      description: 'Learn about how an AVL tree works!',
      slug: 'trees',
      thumbnail: {
        light: '/products/thumbnails/binary-tree.png',
        dark: '/products/thumbnails/binary-tree.png',
      },
    },
    {
      id: 'traversals',
      name: 'Traversals',
      description: 'Learn about how an traversals like BFS and DFS works!',
      slug: 'traversals',
      thumbnail: {
        light: '/products/sim-thumbnails/bfs.png',
        dark: '/products/sim-thumbnails/bfs.png',
      },
    },
    {
      id: 'path-finding',
      name: 'Path Finding',
      description:
        'Learn about how an path finding algorithms like Dijkstras work!',
      slug: 'path',
      thumbnail: {
        light: '/products/thumbnails/dijkstras.png',
        dark: '/products/thumbnails/dijkstras.png',
      },
    },
  ];

  const graph = useProvidedGraph();

  const imageUriFromThumbnail = (thumbnail: Thumbnail) => {
    const presetName = graph.theme.activePresetName.value;
    return thumbnail[presetName];
  };

  const descriptionClasses = useThemeToClasses({
    dark: 'text-gray-300',
    light: 'text-gray-800',
  });
</script>

<template>
  <Dropdown>
    <template #trigger>
      <Well class="p-0">
        <Button class="bg-transparent text-xl p-2 px-4 text-magic">
          Magic Graphs
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
