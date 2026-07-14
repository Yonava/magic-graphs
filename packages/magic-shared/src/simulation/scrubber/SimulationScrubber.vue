<script setup lang="ts">
  import Button from '../../components/button/Button.vue';
  import HStack from '../../components/layout/HStack.vue';
  import Well from '../../components/layout/Well.vue';
  import { useRunningSimulation } from '../useRunningSimulation.ts';

  const { simulation, violation, explainer } = useRunningSimulation();
</script>

<template>
  <Well :class="violation ? 'bg-red-600' : ''">
    <div v-if="violation">{{ violation.reason }}</div>
    <div v-if="explainer">{{ explainer }}</div>
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
