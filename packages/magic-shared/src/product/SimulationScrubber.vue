<script setup lang="ts">
  import { nullThrows } from '@core/utils/assert';

  import { computed } from 'vue';

  import Well from '../components/layout/Well.vue';
  import { useProvidedGraph } from './useProvidedGraph.ts';

  const graph = useProvidedGraph();

  const simulation = computed(() =>
    nullThrows(
      graph.magic.simulation.runningSimulation.value,
      'simulation scrubber requires a running simulation',
    ),
  );
</script>

<template>
  <Well></Well>
</template>
