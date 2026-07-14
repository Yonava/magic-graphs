<script setup lang="ts">
  import Button from '@magic/shared/Button';
  import HStack from '@magic/shared/HStack';
  import ToggleButton from '@magic/shared/ToggleButton';
  import Well from '@magic/shared/Well';
  import { Lens } from '@magic/shared/lens';
  import { useProvidedGraph } from '@magic/shared/product';
  import { useThemer } from '@magic/shared/themer';

  import { defineAsyncComponent } from 'vue';

  import { useSimulation } from './simulations/bfs.ts';

  const graph = useProvidedGraph();

  const fn = ({ id }: { id: string }) =>
    graph.nodes.value.at(0)?.id === id ? 'blue' : 'red';

  const themer = useThemer({
    canvas: {
      'node.default.color': fn,
    },
    anchors: {
      'anchors.default.color': fn,
    },
  });

  const nodeLens: Lens = {
    id: 'node-color',
    components: [
      {
        component: defineAsyncComponent(() => import('./NodeLens.vue')),
        position: 'bottom-right',
      },
      {
        component: defineAsyncComponent(() => import('./NodeLens.vue')),
        position: 'top-right',
      },
      {
        component: defineAsyncComponent(() => import('./NodeLens.vue')),
        position: 'bottom-left',
      },
      {
        component: defineAsyncComponent(() => import('./NodeLens.vue')),
        position: 'top-left',
      },
      {
        component: defineAsyncComponent(() => import('./NodeLens.vue')),
        position: 'top-middle',
      },
    ],
    ...themer,
  };

  const bfsSim = useSimulation();

  const toggleSim = () => {
    const { simulation } = graph.magic;
    const { current } = simulation;
    if (!current.value) {
      simulation.start(bfsSim);
    } else {
      simulation.stop();
    }
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
