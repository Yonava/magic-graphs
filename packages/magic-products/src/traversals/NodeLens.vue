<script setup lang="ts">
  import Well from '@magic/shared/Well';
  import { useProvidedGraph } from '@magic/shared/product';

  const graph = useProvidedGraph();

  graph.events.subscribe('', () => {
    console.log(graph.nodes.value[0].label);
  });

  graph.
</script>

<template>
  <Well
    v-for="node in graph.nodes.value"
    @click="graph.nodeLabel.set({ nodeId: node.id, label: '!' })"
  >
    {{ node }}
  </Well>
</template>
