<script setup lang="ts">
  import { computed } from 'vue';

  import NodeList from './NodeList.vue';
  import { useCurrentFrame } from './useCurrentFrame.ts';

  const { currentFrame } = useCurrentFrame();
  const queued = computed(() => currentFrame.value?.queuedNodeIds ?? []);
</script>

<template>
  <NodeList
    :ids="queued"
    targeting-id="queue-list"
  />
</template>
