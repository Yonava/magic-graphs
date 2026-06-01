<script setup lang="ts">
  import CIcon from '@magic/ui/core/Icon.vue';
  import CPopoverTooltip from '@magic/ui/core/PopoverTooltip.vue';
  import { getCommaList } from '@magic/utils/string';

  import { computed } from 'vue';

  import { nonNullGraph as graph } from '../../../shared/globalGraph.ts';
  import GNode from '../../../shared/ui/graph-core/GNode.vue';
  import GWell from '../../../shared/ui/graph-core/GWell.vue';

  const getNode = (nodeId: string) => {
    const node = graph.value.getNode(nodeId);
    if (node === undefined) throw new Error('node not found');
    return node;
  };

  const isWeighted = computed(() => graph.value.settings.value.isGraphWeighted);
</script>

<template>
  <div class="flex flex-col gap-4">
    <div
      v-for="(value, key) in graph.adjacencyList.weightedAdjacencyList.value"
      :key="key"
      class="flex items-center"
    >
      <div>
        <CPopoverTooltip>
          <GNode :node="getNode(key)" />
          <template #content>
            <GWell class="px-3 py-2 rounded-md">
              <b>{{ getNode(key).label }}</b>
              links to
              <b>{{ getCommaList(value.map((n) => n.label)) || 'nothing' }}</b>
            </GWell>
          </template>
        </CPopoverTooltip>
      </div>

      <CIcon
        icon="arrow-right"
        class="text-4xl"
      />

      <div class="overflow-auto">
        <div class="flex items-center gap-4">
          <div
            v-for="node in value"
            :key="node.id"
          >
            <CPopoverTooltip>
              <GNode
                :node="node"
                class="relative flex flex-col"
              >
                <span class="leading-[15px]">
                  {{ node.label }}
                </span>
                <span
                  v-if="isWeighted"
                  class="leading-[15px] text-[8px]"
                >
                  Cost {{ node.weight.toFraction() }}
                </span>
              </GNode>

              <template #content>
                <GWell class="p-2 rounded-md">
                  <b>{{ node.label }}</b>
                  links to
                  <b>{{ getNode(key).label }}</b>
                  <span v-if="isWeighted">
                    with a cost of
                    <b>{{ node.weight.toFraction() }}</b>
                  </span>
                </GWell>
              </template>
            </CPopoverTooltip>
          </div>
          <h2
            v-if="value.length === 0"
            class="opacity-60"
          >
            None
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>
