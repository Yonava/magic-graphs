<script setup lang="ts">
  import { useProvidedGraph } from '../product/useProvidedGraph.ts';
  import { useComponentBySlotPosition } from './useComponentsBySlotPosition.ts';

  const graph = useProvidedGraph();

  const componentSlots = useComponentBySlotPosition(graph.magic.componentSlots);

  defineProps<{
    left: string;
    right: string;
  }>();
</script>

<template>
  <div
    v-for="(components, position) of componentSlots"
    :class="$props[position]"
  >
    <component
      v-for="component of components"
      :is="component"
    />
  </div>
</template>
