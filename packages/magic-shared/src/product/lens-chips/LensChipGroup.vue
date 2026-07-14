<script setup lang="ts">
  import { defineAsyncComponent } from 'vue';

  import HStack from '../../components/layout/HStack.vue';
  import Well from '../../components/layout/Well.vue';
  import { Lens } from '../../lens/types.ts';
  import { useThemer } from '../../themer/useThemer.ts';
  import { useProvidedGraph } from '../useProvidedGraph.ts';
  import LensChip from './LensChip.vue';
  import NodeLens from './NodeLens.vue';
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
        component: NodeLens,
        position: 'bottom-right',
      },
    ],
    ...themer,
  };

  const chips: LensChipDefinition[] = [
    {
      lens: nodeLens,
      title: 'Node Lens',
      tooltipContent: 'Red Nodes',
    },
  ];
</script>

<template>
  <Well>
    <HStack>
      <LensChip
        v-for="chip of chips"
        v-bind="chip"
      />
    </HStack>
  </Well>
</template>
