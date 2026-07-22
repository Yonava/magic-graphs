<script setup lang="ts">
  import Button from '@magic/shared/Button';
  import HStackVue from '@magic/shared/HStack';
  import Well from '@magic/shared/Well';
  import { GNode } from '@magic/shared/graph';
  import { useProvidedGraph } from '@magic/shared/product';
  import { useFocusedNode } from '@magic/shared/utilities';

  import { useTraversalSimulations } from './simulations/index.ts';

  const graph = useProvidedGraph();

  const simulations = useTraversalSimulations();

  const node = useFocusedNode(graph);

  const startBfs = (id: GNode['id']) => {
    simulations.startNodeId.value = id;
    graph.magic.simulation.start(simulations.bfs);
  };

  const startDfs = (id: GNode['id']) => {
    simulations.startNodeId.value = id;
    graph.magic.simulation.start(simulations.dfs);
  };
</script>

<template>
  <Well v-if="node && !graph.magic.simulation.current.value">
    <HStackVue>
      <Button @click="startBfs(node.id)">
        Start BFS on {{ node.label }}
      </Button>
      <Button @click="startDfs(node.id)">
        Start DFS on {{ node.label }}
      </Button>
    </HStackVue>
  </Well>
</template>
