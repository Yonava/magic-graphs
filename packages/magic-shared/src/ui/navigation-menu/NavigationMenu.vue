<script setup lang="ts">
  import { navigateTo } from 'nuxt/app';

  import Button from '../../components/button/Button.vue';
  import Dropdown from '../../components/dropdown/Dropdown.vue';
  import DropdownItem from '../../components/dropdown/DropdownItem.vue';
  import VStack from '../../components/layout/VStack.vue';
  import { ThemePreset } from '../../graph/types.ts';
  import { useProvidedGraph } from '../../product/useProvidedGraph.ts';

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
</script>

<template>
  <Dropdown>
    <template #trigger>
      <Button> Dropdown </Button>
    </template>
    <VStack>
      <template
        v-for="product in products"
        :key="product.id"
      >
        <DropdownItem @click="navigateTo(`/${product.slug}`)">
          <Button>
            <img
              :src="imageUriFromThumbnail(product.thumbnail)"
              :alt="product.name"
              class="w-20 h-20 object-cover"
            />
            {{ product.name }}
          </Button>
        </DropdownItem>
      </template>
    </VStack>
  </Dropdown>
</template>
