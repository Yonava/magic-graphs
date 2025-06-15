<script setup lang="ts">
  import { computed } from 'vue';
  import { nonNullGraph as graph } from '@graph/global';
  import CPopover from '@ui/core/Popover.vue';
  import GWell from '@ui/graph/GWell.vue';
  import AdjacencyList from './AdjacencyList.vue';
  import TransitionMatrix from './TransitionMatrix.vue';
  import ConnectedInfo from './ConnectedInfo.vue';

  const graphHasNodes = computed(() => graph.value.nodes.value.length > 0);
</script>

<template>
  <CPopover>
    <template #activator="props">
      <slot v-bind="props"></slot>
    </template>

    <GWell
      class="flex flex-col text-xl font-bold p-3 w-[400px] max-h-[500px] overflow-auto rounded-lg gap-2"
    >
      <h1 class="text-2xl">Graph Info</h1>

      <div v-if="graphHasNodes">
        <ConnectedInfo />
        <AdjacencyList />
        <TransitionMatrix />
      </div>

      <div v-else>
        <h2 class="font-normal text-base">
          After adding nodes and edges, come back here to learn about your
          graph! Is it connected? bipartite? planar? what the heck is planar?
        </h2>
      </div>
    </GWell>
  </CPopover>
</template>
