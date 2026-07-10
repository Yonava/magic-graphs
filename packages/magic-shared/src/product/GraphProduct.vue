<script setup lang="ts">
  import CanvasSurface from '@canvas/surface/CanvasSurface.vue';

  import ComponentSlots from '../component-slot/ComponentSlots.vue';
  import { useDisablePointerEvents } from './useDisablePointerEvents.ts';
  import { useProvidedGraph } from './useProvidedGraph.ts';

  const graph = useProvidedGraph();
  const pointerEvents = useDisablePointerEvents(graph);

  const slotSharedClasses =
    'absolute -translate-y-1/2 top-1/2 flex flex-col gap-2';
</script>

<template>
  <div :class="[pointerEvents]">
    <ComponentSlots
      :left="`${slotSharedClasses} left-6`"
      :right="`${slotSharedClasses} right-6`"
    />
    <div class="absolute bottom-6 -translate-x-1/2 left-1/2">
      <slot></slot>
    </div>
  </div>

  <CanvasSurface v-bind="graph.canvas.magicCanvas.ref" />
</template>
