<script setup lang="ts">
  import Button from '@magic/shared/Button';
  import Well from '@magic/shared/Well';
  import { useProvidedGraph } from '@magic/shared/product';
import { useFocusedNode } from '@magic/shared/utilities';

  const graph = useProvidedGraph();
  const node = useFocusedNode(graph);
</script>

<template>
  <Well v-if="node">
    <Button> Start BFS on {{ node.label }} </Button>
  </Well>
</template>
