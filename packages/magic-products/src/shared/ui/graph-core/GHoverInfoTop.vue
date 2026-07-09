<script setup lang="ts">
  // modifies GHoverInfo to invert offset when tooltip content appears
  // above the activator
  import GHoverInfo from './GHoverInfo.vue';

  withDefaults(
    defineProps<{
      tooltip: string;
      offset?: string | number;
    }>(),
    {
      offset: -4,
    },
  );
</script>

<template>
  <GHoverInfo
    :tooltip="tooltip"
    :offset="offset"
  >
    <slot></slot>
  </GHoverInfo>
</template>
