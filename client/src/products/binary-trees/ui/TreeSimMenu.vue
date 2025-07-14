<script setup lang="ts">
  import { toRef } from 'vue';
  import type { TreeSimRunner } from '../state';
  import SimulationPlaybackControls from '@ui/product/sim/SimulationPlaybackControls.vue';

  const props = defineProps<{
    controls: TreeSimRunner['simControls'];
  }>();

  const rProp = toRef(props);
</script>

<template>
  <SimulationPlaybackControls :controls="rProp.controls" />
</template>
