<script setup lang="ts">
  import { nullThrows } from '@core/utils/assert';

  import { computed } from 'vue';

  import Button from '../components/button/Button.vue';
  import HStack from '../components/layout/HStack.vue';
  import Well from '../components/layout/Well.vue';
  import { useProvidedGraph } from '../product/useProvidedGraph.ts';

  const graph = useProvidedGraph();

  const simulation = computed(() =>
    nullThrows(
      graph.magic.simulation.current.value,
      'simulation scrubber requires a running simulation',
    ),
  );
</script>

<template>
  <Well>
    <HStack>
      <Button
        :disabled="simulation.playhead.isFirst()"
        @click="simulation.playhead.prev()"
        >Prev</Button
      >
      <Button
        :disabled="simulation.playhead.isLast()"
        @click="simulation.playhead.next()"
        >Next</Button
      >
    </HStack>
  </Well>
</template>
