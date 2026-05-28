<script setup lang="ts">
  import { computed } from 'vue';

  import { nonNullGraph as graph } from '../../shared/globalGraph.ts';
  import { useFordFulkerson } from '../algo/useFordFulkerson.ts';

  const { output } = useFordFulkerson(graph.value);
  const maxFlow = computed(() => output.maxFlow.value);
</script>

<template>
  <div class="flex gap-3 text-white">
    <span class="font-bold text-xl">Max Flow {{ maxFlow ?? 'Unknown' }}</span>
  </div>
</template>
