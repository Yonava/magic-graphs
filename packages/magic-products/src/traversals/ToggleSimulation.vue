<script setup lang="ts">
  import HStack from '@magic/shared/HStack';
  import ToggleButton from '@magic/shared/ToggleButton';
  import Well from '@magic/shared/Well';
  import { useProvidedGraph } from '@magic/shared/product';

  import { useSimulation } from './simulations/bfs.ts';

  const graph = useProvidedGraph();

  const bfsSim = useSimulation();

  const toggleSim = () => {
    const { simulation } = graph.magic;
    simulation.current.value ? simulation.stop() : simulation.start(bfsSim);
  };
</script>

<template>
  <Well>
    <HStack>
      <ToggleButton
        @click="toggleSim"
        :model-value="!!graph.magic.simulation.current.value"
        >Toggle Simulation</ToggleButton
      >
    </HStack>
  </Well>
</template>
