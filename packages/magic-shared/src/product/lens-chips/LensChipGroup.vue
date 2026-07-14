<script setup lang="ts">
  import { defineAsyncComponent } from 'vue';

  import { Lens } from '../../lens/types.ts';
  import { useThemer } from '../../themer/useThemer.ts';
  import { useProvidedGraph } from '../useProvidedGraph.ts';
  import { LensChipDefinition } from './types.ts';

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

  const chips: LensChipDefinition[] = [];
</script>

<template></template>
