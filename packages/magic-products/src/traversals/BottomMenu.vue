<script setup lang="ts">
  import Button from '@magic/shared/Button';
  import HStack from '@magic/shared/HStack';
  import LensChip from '@magic/shared/LensChip';
  import ToggleButton from '@magic/shared/ToggleButton';
  import Well from '@magic/shared/Well';
  import { Lens } from '@magic/shared/lens';
  import { useProvidedGraph } from '@magic/shared/product';
  import { useThemer } from '@magic/shared/themer';

  import { defineAsyncComponent } from 'vue';

  import { useSimulation } from './simulations/bfs.ts';

  const graph = useProvidedGraph();

  const toggleTheme = () => {
    const preset = graph.activePreset.value;
    graph.activePreset.value = preset === 'dark' ? 'light' : 'dark';
  };

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

  graph.events.subscribe('onKeyDown', (e) => {
    if (e.key === 'Backspace') {
      graph.actions.removeElements(
        {
          nodes: graph.focus.focusedNodes(),
          edges: graph.focus.focusedEdges(),
        },
        {},
      );
    }
  });
</script>

<template>
  <Well>
    <HStack>
      <LensChip
        v-bind="{
          lens: nodeLens,
          title: 'Lens Chip',
          tooltipContent: 'This is a lens chip',
        }"
      />
      <ToggleButton
        @click="toggleSim"
        :model-value="!!graph.magic.simulation.current.value"
        >Toggle Simulation</ToggleButton
      >
      <Button @click="toggleTheme"> Change Theme </Button>
    </HStack>
  </Well>
</template>
