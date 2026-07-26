<script setup lang="ts">
  import NodeList from '@magic/shared/NodeList';
  import { useCurrentFrame } from '@magic/shared/simulation';

  import { computed } from 'vue';

  import { TraversalFrame } from '../frame.ts';
  import { slotIds } from '../shared.ts';

  const currentFrame = useCurrentFrame<TraversalFrame>();
  const queued = computed(() => currentFrame.value?.queuedNodeIds ?? []);
</script>

<template>
  <NodeList
    :ids="queued"
    :slot-id="slotIds.queue"
  />
</template>
