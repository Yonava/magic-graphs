<script setup lang="ts">
  import NodeList from '@magic/shared/NodeList';

  import { computed } from 'vue';

  import { slotIds } from '../shared.ts';
  import { useCurrentFrame } from './useCurrentFrame.ts';

  const { currentFrame } = useCurrentFrame();
  const visited = computed(() => currentFrame.value?.visitedNodeIds ?? []);
</script>

<template>
  <NodeList
    :ids="visited"
    :slot-id="slotIds.visited"
    exit-side="left"
  />
</template>
