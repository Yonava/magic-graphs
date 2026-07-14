<script setup lang="ts">
  import Button from '@magic/shared/Button';
  import Well from '@magic/shared/Well';
  import { useProvidedGraph } from '@magic/shared/product';

  const graph = useProvidedGraph();

  const toggleTheme = () => {
    const preset = graph.activePreset.value;
    graph.activePreset.value = preset === 'dark' ? 'light' : 'dark';
  };
</script>

<template>
  <Well>
    <Button @click="toggleTheme"> Change Theme </Button>
  </Well>
</template>
