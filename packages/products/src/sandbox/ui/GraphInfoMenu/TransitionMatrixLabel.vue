<script setup lang="ts">
  import type { GNode } from '@magic/graph/types';
  import CIcon from '@magic/ui/core/Icon.vue';
  import CPopoverTooltip from '@magic/ui/core/PopoverTooltip.vue';

  import GraphNode from '../../../shared/ui/graph-core/GNode.vue';
  import GWell from '../../../shared/ui/graph-core/GWell.vue';
  import GButton from '../../../shared/ui/graph-core/button/GButton.vue';

  const props = defineProps<{
    toNode: GNode;
    fromNode: GNode;
    weight: string;
  }>();
</script>

<template>
  <div
    class="text-xl font-bold text-center flex items-center justify-center overflow-hidden p-[3px]"
  >
    <CPopoverTooltip>
      <GButton
        secondary
        class="h-10 w-10 cursor-default grid place-items-center rounded-md"
      >
        {{ weight }}
      </GButton>
      <template #content>
        <GWell class="flex items-center py-2 px-3 rounded-md">
          <GraphNode
            :node="toNode"
            :size="30"
          />
          <CIcon
            class="text-2xl"
            icon="arrow-right"
          />
          <GraphNode
            :node="fromNode"
            :size="30"
          />
        </GWell>
      </template>
    </CPopoverTooltip>
  </div>
</template>
