<script setup lang="ts">
  import Well from '@magic/shared/Well';
  import { useProvidedGraph } from '@magic/shared/product';

  const graph = useProvidedGraph();

  const print = () => {
    console.log('Getters Invalidated', graph.nodes.value[0].label);
  };

  graph.events._internal.gettersInvalidation.subscribe(
    'onGettersInvalidated',
    print,
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
