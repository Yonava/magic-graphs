<script setup lang="ts">
  import Button from '../../components/button/Button.vue';
  import HStack from '../../components/layout/HStack.vue';
  import VStack from '../../components/layout/VStack.vue';
  import Well from '../../components/layout/Well.vue';
  import { useRunningSimulation } from '../useRunningSimulation.ts';
  import ExplainerText from './ExplainerText.vue';

  const { simulation, violation } = useRunningSimulation();
</script>

<template>
  <VStack class="items-center">
    <Well :class="violation ? 'bg-red-600' : ''">
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

    <div>
      <ExplainerText />
    </div>
  </VStack>
</template>
