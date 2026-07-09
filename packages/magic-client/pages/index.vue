<script setup lang="ts">
  import Button from '@core/components/Button.vue';
  import Tooltip from '@core/components/Tooltip.vue';

  useSeoMeta({
    title: 'Magic Graphs',
    description: 'Hello world from Nuxt SSG.',
  });
</script>

<template>
  <main class="flex h-full flex-col items-center justify-center gap-4">
    <h1 class="text-2xl text-red-500 font-semibold">Hello world</h1>
    <Button>Click me</Button>
    <Tooltip label="A vertex is a node in the graph.">
      <template #trigger>
        <Button variant="outline">Vertex</Button>
      </template>
    </Tooltip>
  </main>
</template>
