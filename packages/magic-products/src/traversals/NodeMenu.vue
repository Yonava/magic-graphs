<script setup lang="ts">
  import { nullThrows } from '@core/utils/assert';
  import Button from '@magic/shared/Button';
  import HStackVue from '@magic/shared/HStack';
  import Well from '@magic/shared/Well';
  import { useProvidedGraph } from '@magic/shared/product';
  import { useFocusedNode } from '@magic/shared/utilities';

  import { useTraversalSimulations } from './simulations/index.ts';

  const graph = useProvidedGraph();

  const simulations = useTraversalSimulations();

  const node = useFocusedNode(graph);

  const startSim = (type: 'bfs' | 'dfs') => {
    simulations.startNodeId.value = nullThrows(
      node.value?.id,
      'no node defined',
    );
    graph.magic.simulation.start(simulations[type]);
    graph.focus.clear();
  };
</script>

<template>
  <Well v-if="node && !graph.magic.simulation.current.value">
    <HStackVue>
      <Button @click="startSim('bfs')"> Start BFS on {{ node.label }} </Button>
      <Button @click="startSim('dfs')"> Start DFS on {{ node.label }} </Button>
    </HStackVue>
  </Well>
</template>
