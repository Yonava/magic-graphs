<script setup lang="ts">
  import { mdiPlus, mdiStar } from '@mdi/js';

  import Button from '@core/components/Button';
  import Dropdown from '@core/components/Dropdown';
  import DropdownItem from '@core/components/DropdownItem';
  import Icon from '@core/components/Icon';
  import IconButton from '@core/components/IconButton';
  import Tooltip from '@core/components/Tooltip';

  useSeoMeta({
    title: 'Magic Graphs',
    description: 'Hello world from Nuxt SSG.',
  });
</script>

<template>
  <main class="flex h-full flex-col items-center justify-center gap-4">
    <h1 class="text-2xl text-red-500 font-semibold">Hello world</h1>
    <Button>
      <template #start>
        <Icon :path="mdiPlus" :size="16" />
      </template>
      Click me
    </Button>
    <Tooltip label="A vertex is a node in the graph.">
      <template #trigger>
        <Button variant="outline">Vertex</Button>
      </template>
    </Tooltip>
    <Icon :path="mdiStar" class="text-amber-500" />
    <IconButton :path="mdiPlus" label="Add node" variant="outline" />
    <Dropdown>
      <template #trigger>
        <Button variant="outline">Products</Button>
      </template>
      <DropdownItem>
        <a href="#" class="block rounded-sm px-3 py-2 text-sm">Sandbox</a>
      </DropdownItem>
      <DropdownItem>
        <a href="#" class="block rounded-sm px-3 py-2 text-sm">Basic Search</a>
      </DropdownItem>
      <DropdownItem>
        <a href="#" class="block rounded-sm px-3 py-2 text-sm">Dijkstras Algorithm</a>
      </DropdownItem>
    </Dropdown>
  </main>
</template>
