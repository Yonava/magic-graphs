<script setup lang="ts">
  import { toRef } from 'vue';
  import type { TreeSimRunner } from '../state';
  import { useTreeTraceExplainer } from './useTreeTraceExplainer';
  import SimulationPlaybackControls from '@ui/product/sim/SimulationPlaybackControls.vue';

  const props = defineProps<{
    controls: TreeSimRunner['simControls'];
  }>();

  const rProp = toRef(props);

  const explainer = useTreeTraceExplainer();
</script>

<template>
  <div class="">
    <div>
      <h1 class="mb-2 font-bold text-2xl">
        {{ explainer ?? 'N/A' }}
      </h1>
    </div>
    <SimulationPlaybackControls :controls="rProp.controls" />
  </div>
</template>
