<script setup lang="ts">
  import CanvasSurface from '@canvas/surface/CanvasSurface.vue';

  import { useDisablePointerEvents } from './useDisablePointerEvents.ts';
  import { useProvidedGraph } from './useProvidedGraph.ts';

  const graph = useProvidedGraph();
  const pointerEvents = useDisablePointerEvents(graph);
</script>

<template>
  <div :class="[pointerEvents]"></div>

  <CanvasSurface v-bind="graph.canvas.magicCanvas.ref" />
</template>
