<script setup lang="ts">
  import colors from '@core/utils/colors';
  import Button from '@magic/shared/Button';
  import HStack from '@magic/shared/HStack';
  import Well from '@magic/shared/Well';
  import { Lens } from '@magic/shared/lens';
  import { useProvidedGraph } from '@magic/shared/product';
  import { useThemer } from '@magic/shared/themer';

  import { defineAsyncComponent } from 'vue';

  import SimulationButton from './SimulationButton.vue';

  const graph = useProvidedGraph();

  const toggleTheme = () => {
    const preset = graph.activePreset.value;
    graph.activePreset.value = preset === 'dark' ? 'light' : 'dark';
  };

  const themer = useThemer({
    canvas: {
      'canvas.patternColor': (at, alpha) => {
        if (at.x >= 110) return;
        return colors.AMBER_500 + alpha;
      },
      'node.default.border.color': 'blue',
    },
    focus: {},
  });

  const customLens: Lens = {
    id: 'custom-lens',
    activate: themer.activate,
    deactivate: themer.deactivate,
    components: [
      {
        component: defineAsyncComponent(() => import('./NodeAColor.vue')),
        position: 'center-left',
      },
      {
        component: defineAsyncComponent(() => import('./NodeAColor.vue')),
        position: 'center-right',
      },
      {
        component: defineAsyncComponent(() => import('./NodeAColor.vue')),
        position: 'top-middle',
      },
      {
        component: defineAsyncComponent(() => import('./NodeAColor.vue')),
        position: 'top-right',
      },
    ],
  };

  const applyLens = () => {
    if (graph.magic.lens.activeId.value === customLens.id) {
      graph.magic.lens.remove(customLens.id);
      return;
    }
    graph.magic.lens.add(customLens);
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
      <Button @click="toggleTheme"> Toggle Theme </Button>
      <Button @click="applyLens"> Toggle Custom Lens </Button>
      <SimulationButton />
    </HStack>
  </Well>
</template>
