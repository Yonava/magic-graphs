<script setup lang="ts">
  import { computed } from 'vue';

  import NodeList from './NodeList.vue';
  import { useCurrentFrame } from './useCurrentFrame.ts';

  const { currentFrame } = useCurrentFrame();
  const visited = computed(() => currentFrame.value?.visitedNodeIds ?? []);
</script>

<template>
  <NodeList
    :ids="visited"
    exit-side="left"
  />
</template>
