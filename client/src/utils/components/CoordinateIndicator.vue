<script setup lang="ts">
  import { computed } from 'vue';
  import type { CanvasCoords } from './useCanvasCoord';

  const props = defineProps<{
    coords: CanvasCoords;
  }>();

  const humanCoords = computed(() => props.coords.humanCoords.value);
  const canvasCoords = computed(() => props.coords.canvasCoords.value);
</script>

<template>
  <p
    class="dark:text-white absolute top-24 right-0 mt-2 mr-6 select-none text-end pointer-events-none"
  >
    Canvas ({{ canvasCoords.x }}, {{ canvasCoords.y }})
    <br />
    Human ({{ humanCoords.x }}, {{ humanCoords.y }})
  </p>
</template>
