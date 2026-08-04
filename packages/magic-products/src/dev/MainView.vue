<script setup lang="ts">
  import { GraphProduct, useGraphProduct } from '@magic/shared/product';

  import { onMounted } from 'vue';

  import ActionBar from './ActionBar.vue';
  import { manifest } from './manifest.ts';

  const graph = useGraphProduct({
    manifest,
    core: {
      directed: false,
    },
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

  onMounted(() => {
    const a = graph.nodes.value.find((n) => n.label === 'A')?.id!;
    const c = graph.nodes.value.find((n) => n.label === 'C')?.id!;
    graph.phantom.addEdge({
      id: 'phantom-edge-1',
      source: a,
      target: c,
      label: 'ABC',
    });
  });
</script>

<template>
  <GraphProduct />
</template>
