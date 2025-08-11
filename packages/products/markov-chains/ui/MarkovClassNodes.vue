<script setup lang="ts">
  import type { GNode } from '@graph/types';
  import GraphNode from '@ui/graph/GNode.vue';
  import GWell from '@ui/graph/GWell.vue';

  defineProps<{
    classes: GNode[][];
  }>();
</script>

<template>
  <div class="flex flex-col gap-1">
    <p class="text-base font-bold">
      <slot><!-- optional fallback --></slot>
    </p>
    <GWell
      secondary
      class="p-2 rounded-md flex gap-3"
    >
      <div
        v-for="nodes in classes"
        :key="nodes[0].id"
      >
        <div class="flex flex-row gap-1">
          <div
            v-for="node in nodes"
            :key="node.id"
          >
            <GraphNode
              :node="node"
              :size="40"
            />
          </div>
        </div>
      </div>
    </GWell>
  </div>
</template>
