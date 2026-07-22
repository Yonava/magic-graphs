<script setup lang="ts">
  import { mdiStop } from '@mdi/js';

  import { onBeforeUnmount } from 'vue';

  import Button from '../components/button/Button.vue';
  import Icon from '../components/icon/Icon.vue';
  import { useProvidedGraph } from '../product/useProvidedGraph.ts';

  const graph = useProvidedGraph();

  const stopSimulationOnEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape') graph.magic.simulation.stop();
  };

  graph.canvas.events.subscribe('onKeyDown', stopSimulationOnEsc);
  onBeforeUnmount(() =>
    graph.canvas.events.unsubscribe('onKeyDown', stopSimulationOnEsc),
  );
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
