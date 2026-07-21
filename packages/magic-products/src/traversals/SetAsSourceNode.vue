<script setup lang="ts">
  import Button from '@magic/shared/Button';
  import Well from '@magic/shared/Well';
  import { useProvidedGraph } from '@magic/shared/product';

  const graph = useProvidedGraph();
</script>

<template>
  <Well>
    <Button> Set Node As Source </Button>
  </Well>
</template>
