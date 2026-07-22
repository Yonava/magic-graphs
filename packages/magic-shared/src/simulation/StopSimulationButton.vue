<script setup lang="ts">
  import { mdiStop } from '@mdi/js';

  import Button from '../components/button/Button.vue';
  import Icon from '../components/icon/Icon.vue';
  import { useProvidedGraph } from '../product/useProvidedGraph.ts';
  import { useCtrlKeys } from '../utilities/useCtrlKeys.ts';

  const graph = useProvidedGraph();

  useCtrlKeys().add('escape', () => graph.magic.simulation.stop());
</script>

<template>
  <Button
    v-if="graph.magic.simulation.current.value"
    @click="graph.magic.simulation.stop()"
    class="bg-red-500 hover:bg-red-600"
  >
    <template #start>
      <Icon :path="mdiStop" />
    </template>
    Stop Simulation
  </Button>
</template>
