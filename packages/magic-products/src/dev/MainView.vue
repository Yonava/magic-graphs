<script setup lang="ts">
  import { GraphProduct, useGraphProduct } from '@magic/shared/product';

  import ActionBar from './ActionBar.vue';
  import { manifest } from './manifest.ts';

  const graph = useGraphProduct({
    manifest,
    ui: {
      debug: true,
    },
  });

  graph.magic.componentSlots.add({
    id: 'action-bar',
    component: ActionBar,
    position: 'bottom-middle',
  });

  graph.phantom.addNode({
    id: 'phantom-node-1',
    position: { x: 850, y: 430 },
    label: 'A!',
  });
  graph.phantom.addNode({
    id: 'phantom-node-2',
    position: { x: 850, y: 30 },
    label: 'B!',
  });
  graph.phantom.addEdge({
    id: 'phantom-edge-1',
    source: 'phantom-node-1',
    target: 'phantom-node-2',
    label: 'ABC',
  });
</script>

<template>
  <GraphProduct />
</template>
