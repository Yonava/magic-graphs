<script setup lang="ts">
  import { Lens } from '@magic/shared/lens';
  import { useProvidedGraph } from '@magic/shared/product';
  import { useThemer } from '@magic/shared/themer';
  import Button from '@magic/shared/Button';
  import HStack from '@magic/shared/HStack';
  import LensChip from '@magic/shared/LensChip';
  import ToggleButton from '@magic/shared/ToggleButton';
  import Well from '@magic/shared/Well';

  import { defineAsyncComponent, markRaw } from 'vue';

  import { useSimulation } from './simulations/bfs.ts';

  const graph = useProvidedGraph();

  const toggleTheme = () => {
    const preset = graph.activePreset.value;
    graph.activePreset.value = preset === 'dark' ? 'light' : 'dark';
  };

  const themer = useThemer({
    canvas: {
      'node.default.color': 'red',
    },
  });

  const nodeLens: Lens = {
    id: 'node-color',
    components: [
      {
        component: markRaw(
          defineAsyncComponent(() => import('./NodeLens.vue')),
        ),
        position: 'right',
      },
      {
        component: markRaw(
          defineAsyncComponent(() => import('./NodeLens.vue')),
        ),
        position: 'right',
      },
      {
        component: markRaw(
          defineAsyncComponent(() => import('./NodeLens.vue')),
        ),
        position: 'left',
      },
    ],
    setup: themer.activate,
    teardown: themer.deactivate,
  };

  const bfsSim = useSimulation();

  const toggleSim = () => {
    const { simulation } = graph.magic;
    const { runningSimulation } = simulation;
    if (!runningSimulation.value) {
      simulation.start(bfsSim);
    } else {
      simulation.stop();
    }
  };
</script>

<template>
  <Well>
    <HStack>
      <LensChip
        v-bind="{ lens: nodeLens, title: 'Tip', tooltipContent: 'content ' }"
      />
      <ToggleButton
        @click="toggleSim"
        :model-value="!!graph.magic.simulation.runningSimulation.value"
        >Hello</ToggleButton
      >
      <Button @click="toggleTheme"> Change Theme </Button>
    </HStack>
  </Well>
</template>
