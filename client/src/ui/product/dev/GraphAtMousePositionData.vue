<script setup lang="ts">
  import { nonNullGraph as graph } from '@graph/global';
  import { computed } from 'vue';

  const coords = computed(() => {
    const {
      coords: { x, y },
    } = graph.value.graphAtMousePosition.value;
    return { x: Math.round(x), y: Math.round(y) };
  });

  const hoveredItems = computed(() => {
    const { items } = graph.value.graphAtMousePosition.value;
    return items.map(
      (item) => `${item.graphType} - ${item.shape.name} (${item.id})`,
    );
  });
</script>

<template>
  <div class="text-white text-end">
    <div>Cursor At: (X = {{ coords.x }}, Y = {{ coords.y }})</div>
    <div>Items Hovered: {{ hoveredItems }}</div>
  </div>
</template>
