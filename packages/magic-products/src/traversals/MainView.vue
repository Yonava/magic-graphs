<script setup lang="ts">
  import { GraphProduct, useGraphProduct } from '@magic/shared/product';

  import ToggleSimulation from './ToggleSimulation.vue';
  import ToggleTheme from './ToggleTheme.vue';

  const graph = useGraphProduct();

  graph.magic.componentSlots.addMany([
    {
      id: 'toggle-sim',
      component: ToggleSimulation,
      position: 'top-right',
    },
    {
      id: 'toggle-theme',
      component: ToggleTheme,
      position: 'bottom-right',
    },
  ]);

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
  <GraphProduct />
</template>
