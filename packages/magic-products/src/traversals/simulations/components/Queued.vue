<script setup lang="ts">
  import { nodeRoleColors } from '@magic/shared/theme';

  import { computed } from 'vue';

  import { nodeRoles } from '../index.ts';
  import NodeIdList from './NodeIdList.vue';
  import { useCurrentFrame } from './useCurrentFrame.ts';

  const { currentFrame } = useCurrentFrame();

  const nodeIds = computed(() => currentFrame.value?.queuedNodeIds ?? []);
</script>

<template>
  <NodeIdList
    title="Queued"
    :color="nodeRoleColors[nodeRoles.queued]"
    :node-ids="nodeIds"
  />
</template>
