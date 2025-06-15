<script setup lang="ts">
  import type { Graph } from '@graph/types';
  import type { ColorMap } from '../theme/useMarkupColorizer';
  import type { SizeMap } from '../theme/useMarkupSizer';
  import NodeEdgeColorInput from './MarkupMenu/NodeEdgeColorInput.vue';
  import NodeEdgeSizeInput from './MarkupMenu/NodeEdgeSizeInput.vue';
  import GWell from '@ui/graph/GWell.vue';

  const props = defineProps<{
    graph: Graph;
    sizeMap: SizeMap;
    colorMap: ColorMap;
  }>();
</script>

<template>
  <div class="flex flex-col gap-3">
    <GWell class="p-2 rounded-xl">
      <NodeEdgeColorInput
        :graph="props.graph"
        :color-map="colorMap"
      />
    </GWell>

    <GWell class="p-2 rounded-xl">
      <NodeEdgeSizeInput
        :graph="props.graph"
        :size-map="sizeMap"
      />
    </GWell>
  </div>
</template>
