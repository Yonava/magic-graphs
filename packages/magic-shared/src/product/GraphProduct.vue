<script setup lang="ts">
  import CanvasSurface from '@canvas/surface/CanvasSurface.vue';

  import ComponentSlots from '../component-slot/ComponentSlots.vue';
  import { useDisablePointerEvents } from './useDisablePointerEvents.ts';
  import { useProvidedGraph } from './useProvidedGraph.ts';

  const graph = useProvidedGraph();
  const pointerEvents = useDisablePointerEvents(graph);

  const slotSharedClasses = 'absolute flex flex-col gap-2';
  const slotCenterClasses = `${slotSharedClasses} top-1/2 -translate-y-1/2`;
</script>

<template>
  <div :class="[pointerEvents]">
    <ComponentSlots
      :top-left="`${slotSharedClasses} top-6 left-6`"
      :top-middle="`${slotSharedClasses} top-6 left-1/2 -translate-x-1/2`"
      :top-right="`${slotSharedClasses} top-6 right-6`"
      :center-left="`${slotCenterClasses} left-6`"
      :center-right="`${slotCenterClasses} right-6`"
      :bottom-left="`${slotSharedClasses} bottom-6 left-6`"
      :bottom-middle="`${slotSharedClasses} bottom-6 left-1/2 -translate-x-1/2`"
      :bottom-right="`${slotSharedClasses} bottom-6 right-6`"
    />
  </div>

  <CanvasSurface v-bind="graph.canvas.magicCanvas.ref" />
</template>
