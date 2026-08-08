<script setup lang="ts">
  import { nullThrows } from '@core/utils/assert';
  import Button from '@magic/shared/Button';
  import HStackVue from '@magic/shared/HStack';
  import Well from '@magic/shared/Well';
  import { useProvidedGraph } from '@magic/shared/product';
  import { useFocusedNode } from '@magic/shared/utilities';

  import { usePrimsSimulation } from './simulations/index.ts';

  const graph = useProvidedGraph();

  const simulations = usePrimsSimulation();

  const node = useFocusedNode(graph);

  const startSim = (type: 'prims' | 'kruskals') => {
    if (type === 'kruskals') return

    simulations.startNodeId.value = nullThrows(
      node.value?.id,
      'no node defined',
    );
    graph.magic.simulation.start(simulations[type]);
    graph.focus.clear();
  };
</script>

<template>
  <div v-if="!graph.magic.simulation.current.value">
    <HStackVue
      class="p-1"
    >
      <Button
        @click="startSim('prims')"
        class="text-lg"
      >
        Prim's
      </Button>
      <Button
        @click="startSim('kruskals')"
        class="text-lg"
      >
        Kruskal's
      </Button>
    </HStackVue>
  </div>
</template>
