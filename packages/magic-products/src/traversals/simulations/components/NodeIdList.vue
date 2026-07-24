<script setup lang="ts">
  import HStack from '@magic/shared/HStack';
  import VStack from '@magic/shared/VStack';
  import Well from '@magic/shared/Well';
  import { GNode } from '@magic/shared/graph';
  import { useProvidedGraph } from '@magic/shared/product';

  const props = defineProps<{
    title: string;
    /** the role color these ids carry on the canvas, so the two agree */
    color: string;
    nodeIds: readonly GNode['id'][];
  }>();

  const graph = useProvidedGraph();
</script>

<template>
  <Well>
    <VStack class="gap-2">
      <span class="text-xs uppercase tracking-wide opacity-60">
        {{ props.title }} ({{ props.nodeIds.length }})
      </span>

      <HStack
        v-if="props.nodeIds.length"
        class="gap-1 flex-wrap"
      >
        <span
          v-for="nodeId in props.nodeIds"
          :key="nodeId"
          class="px-2 py-0.5 rounded text-white text-sm"
          :style="{ backgroundColor: props.color }"
        >
          {{ graph.nodeLabel.get(nodeId) }}
        </span>
      </HStack>

      <span
        v-else
        class="text-sm opacity-40"
        >empty</span
      >
    </VStack>
  </Well>
</template>
