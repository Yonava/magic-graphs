<script setup lang="ts">
  import HStack from '../../components/layout/HStack.vue';
  import Well from '../../components/layout/Well.vue';
  import { Lens } from '../../lens/types.ts';
  import { useThemer } from '../../themer/useThemer.ts';
  import { useProvidedGraph } from '../useProvidedGraph.ts';
  import LensChip from './LensChip.vue';
  import NodeLens from './NodeLens.vue';
  import { LensChipDefinition } from './types.ts';

  const graph = useProvidedGraph();

  const nodeThemer = useThemer({
    canvas: {
      'node.default.color': 'red',
    },
  });

  const nodeThemer2 = useThemer({
    canvas: {
      'node.default.color': 'blue',
    },
  });

  const nodeLens: Lens = {
    id: 'node-color',
    components: [
      {
        component: NodeLens,
        position: 'center-left',
      },
    ],
    ...nodeThemer,
  };

  const nodeLens2: Lens = {
    id: 'node-color',
    components: [
      {
        component: NodeLens,
        position: 'center-left',
      },
    ],
    ...nodeThemer2,
  };

  const chips: LensChipDefinition[] = [
    {
      lens: nodeLens,
      title: 'Red Nodes',
      tooltipContent: 'Red Nodes',
    },
    {
      lens: nodeLens2,
      title: 'Blue Nodes',
      tooltipContent: 'Blue Nodes',
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
