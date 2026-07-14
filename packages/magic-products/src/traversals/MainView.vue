<script setup lang="ts">
  import {
    GraphProduct,
    LensChipGroup,
    useGraphProduct,
  } from '@magic/shared/product';

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
    {
      id: 'chip-group',
      component: LensChipGroup,
      position: 'bottom-middle',
    },
  ]);

  graph.events.subscribe('onKeyDown', (e) => {
    if (e.key !== 'Backspace') return;
    graph.actions.removeElements(
      {
        nodes: graph.focus.focusedNodes(),
        edges: graph.focus.focusedEdges(),
      },
      {},
    );
  });
</script>

<template>
  <GraphProduct />
</template>
