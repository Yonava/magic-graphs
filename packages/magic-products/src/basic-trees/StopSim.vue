<script setup lang="ts">
  import Button from '@magic/shared/Button';
  import WellVue from '@magic/shared/Well';
  import { useProvidedGraph } from '@magic/shared/product';

  const graph = useProvidedGraph();

  graph.canvas.events.subscribe('onKeyDown', (e) => {
    if (e.key === 'Escape') graph.magic.simulation.stop();
  });
</script>

<template>
  <WellVue>
    <Button
      @click="graph.magic.simulation.stop()"
      :disabled="!graph.magic.simulation.current.value"
    >
      Stop Sim
    </Button>
  </WellVue>
</template>
