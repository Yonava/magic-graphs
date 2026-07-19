<script setup lang="ts">
  import Well from '@magic/shared/Well';
  import { useProvidedGraph } from '@magic/shared/product';

  import { ref } from 'vue';

  const graph = useProvidedGraph();
  const nodeAsColor = () => {
    const node = graph.nodes.value.at(0);
    if (!node) return;
    const color = graph.theme.tokenResolver('node.border.color', node);
    return color;
  };

  graph.canvas.events.subscribe('onDraw', () => (color.value = nodeAsColor()));

  const color = ref<string>();
</script>

<template>
  <Well> Color of Node A = {{ color }} </Well>
</template>
