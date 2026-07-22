<script setup lang="ts">
  import Button from '@magic/shared/Button';
  import WellVue from '@magic/shared/Well';
  import { useProvidedGraph } from '@magic/shared/product';

  const graph = useProvidedGraph();
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
