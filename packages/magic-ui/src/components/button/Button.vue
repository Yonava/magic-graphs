<script setup lang="ts">
  import Button from '@core/components/Button';
  import { ThemePreset } from '@magic/shared/graph/types';
  import { useProvidedGraph } from '@magic/shared/product/useProvidedGraph';

  import { computed } from 'vue';

  const themeToClasses: Record<ThemePreset, string> = {
    dark: 'bg-blue-500',
    light: 'bg-red-500',
  };

  const graph = useProvidedGraph();
  const classes = computed(() => {
    return themeToClasses[graph.activePreset.value];
  });
</script>

<template>
  <Button :class="classes">
    <slot></slot>
  </Button>
</template>
