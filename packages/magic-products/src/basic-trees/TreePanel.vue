<script setup lang="ts">
  import { nullThrows } from '@core/utils/assert';
  import { getRandomInRange } from '@core/utils/random';
  import Button from '@magic/shared/Button';
  import HStack from '@magic/shared/HStack';
  import Well from '@magic/shared/Well';
  import { useProvidedGraph } from '@magic/shared/product';

  import { ref } from 'vue';

  import { useAVLSimulationDefinition } from './simulation/useAVLSimulation.ts';

  const randomNodeValue = () => getRandomInRange(1, 99);

  const graph = useProvidedGraph();

  const {
    definition: simDefinition,
    mode,
    targetNodeValue,
    nodeValue,
  } = useAVLSimulationDefinition(50);

  const stopSim = () => {
    graph.magic.simulation.stop();
  };

  const addNodeToAvl = () => {
    mode.value = 'insert';
    graph.magic.simulation.start(simDefinition);
    targetNodeValue.value = randomNodeValue();
  };

  const removeNodeFromAvl = (target: number) => {
    mode.value = 'remove';
    const prevTarget = targetNodeValue.value;
    targetNodeValue.value = target;
    graph.magic.simulation.start(simDefinition);
    targetNodeValue.value = prevTarget;
  };
</script>

<template>
  <Well>
    <HStack>
      <Button
        @click="stopSim"
        :disabled="!graph.magic.simulation.current.value"
      >
        Stop Sim
      </Button>
      <Button @click="addNodeToAvl"> Add Node {{ targetNodeValue }} </Button>
      <Button
        v-for="node in graph.nodes.value"
        @click="removeNodeFromAvl(nodeValue(node.id))"
      >
        Remove Node {{ nodeValue(node.id) }}
      </Button>
    </HStack>
  </Well>
</template>
