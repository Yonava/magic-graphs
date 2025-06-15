<script setup lang="ts">
  import { computed } from 'vue';
  import type { GNode, Weight } from '@graph/types';
  import GraphNode from '@ui/graph/GNode.vue';
  import CIcon from '@ui/core/Icon.vue';
  import CPopoverTooltip from '@ui/core/PopoverTooltip.vue';
  import GWell from '@ui/graph/GWell.vue';
  import GButton from '@ui/graph/button/GButton.vue';

  const props = defineProps<{
    toNode: GNode;
    fromNode: GNode;
    weight: Weight;
  }>();

  const weightLabel = computed(() => {
    const isNum = typeof props.weight === 'number';
    return isNum ? props.weight : props.weight.toFraction();
  });
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
        {{ weightLabel }}
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
