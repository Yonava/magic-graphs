<script setup lang="ts">
  import { nonNullGraph as graph } from '@graph/global';

  import { computed } from 'vue';

  import { useFordFulkerson } from '../algo/useFordFulkerson';

  const { output } = useFordFulkerson(graph.value);
  const maxFlow = computed(() => output.maxFlow.value);
</script>

<template>
  <div class="flex gap-3 text-white">
    <span class="font-bold text-xl">Max Flow {{ maxFlow ?? 'Unknown' }}</span>
  </div>
</template>
