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

  const themer = useThemer({
    canvas: {
      'node.default.color': 'red',
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
        position: 'bottom-right',
      },
      {
        component: defineAsyncComponent(() => import('./NodeLens.vue')),
        position: 'bottom-left',
      },
    ],
    setup: themer.activate,
    teardown: themer.deactivate,
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
        v-bind="{ lens: nodeLens, title: 'Tip', tooltipContent: 'content ' }"
      />
      <ToggleButton
        @click="toggleSim"
        :model-value="!!graph.magic.simulation.current.value"
        >Hello</ToggleButton
      >
      <Button @click="toggleTheme"> Change Theme </Button>
    </HStack>
  </Well>
</template>
