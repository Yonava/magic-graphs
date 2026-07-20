<script setup lang="ts">
  import Well from '@magic/shared/Well';
  import { useProvidedGraph } from '@magic/shared/product';

  const graph = useProvidedGraph();

  graph.events._internal.gettersInvalidation.subscribe(
    'onGettersInvalidated',
    () => {
      console.log(graph.nodes.value[0].label);
    },
  );
</script>

<template>
  <Well
    v-for="node in graph.nodes.value"
    @click="graph.nodeLabel.set({ nodeId: node.id, label: '!' })"
  >
    {{ node }}
  </Well>
</template>
