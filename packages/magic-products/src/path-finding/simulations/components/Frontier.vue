<script setup lang="ts">
  import NodeList from '@magic/shared/NodeList';
  import { useCurrentFrame } from '@magic/shared/simulation';

  import { computed } from 'vue';

  import { PathFindingFrame } from '../frame.ts';
  import { slotIds } from '../shared.ts';

  const currentFrame = useCurrentFrame<PathFindingFrame>();

  /*
    only dijkstra keeps a frontier. bellman ford and floyd warshall leave this
    empty, and an empty list slides the panel away on its own, so the lens can
    carry the same components for all three
  */
  const frontier = computed(() => currentFrame.value?.pendingNodeIds ?? []);
</script>

<template>
  <NodeList
    :ids="frontier"
    :slot-id="slotIds.frontier"
  />
</template>
