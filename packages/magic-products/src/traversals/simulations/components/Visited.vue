<script setup lang="ts">
  import NodeList from '@magic/shared/NodeList';

  import { computed } from 'vue';

  import { useCurrentFrame } from './useCurrentFrame.ts';

  const { currentFrame } = useCurrentFrame();
  const visited = computed(() => currentFrame.value?.visitedNodeIds ?? []);
</script>

<template>
  <NodeList
    :ids="visited"
    exit-side="left"
    slot-id="traversals"
  />
</template>
