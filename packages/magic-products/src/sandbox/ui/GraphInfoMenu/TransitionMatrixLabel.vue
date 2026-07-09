<script setup lang="ts">
  import CIcon from '@core/ui/core/Icon.vue';
  import CPopoverTooltip from '@core/ui/core/PopoverTooltip.vue';

  import GraphNode from '../../../shared/ui/graph-core/GNode.vue';
  import GWell from '../../../shared/ui/graph-core/GWell.vue';
  import GButton from '../../../shared/ui/graph-core/button/GButton.vue';
  import { GNode } from '../../../shared/useGraph.ts';

  const props = defineProps<{
    targetNode: GNode;
    sourceNode: GNode;
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
            :node="targetNode"
            :size="30"
          />
          <CIcon
            class="text-2xl"
            icon="arrow-right"
          />
          <GraphNode
            :node="sourceNode"
            :size="30"
          />
        </GWell>
      </template>
    </CPopoverTooltip>
  </div>
</template>
