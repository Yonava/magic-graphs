<script setup lang="ts">
  import NodeList from '@magic/shared/NodeList';

  import { computed } from 'vue';

  import { useCurrentFrame } from './useCurrentFrame.ts';

  const { currentFrame } = useCurrentFrame();
  const queued = computed(() => currentFrame.value?.queuedNodeIds ?? []);
</script>

<template>
  <NodeList
    :ids="queued"
    slot-id="traversals"
  />
</template>
