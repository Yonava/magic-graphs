<script setup lang="ts">
  import NodeList from '@magic/shared/NodeList';
  import { useCurrentFrame } from '@magic/shared/simulation';

  import { computed } from 'vue';

  import { TraversalFrame } from '../frame.ts';
  import { slotIds } from '../shared.ts';

  const currentFrame = useCurrentFrame<TraversalFrame>();
  const visited = computed(() => currentFrame.value?.visitedNodeIds ?? []);
</script>

<template>
  <NodeList
    :ids="visited"
    :slot-id="slotIds.visited"
    exit-side="left"
  />
</template>
