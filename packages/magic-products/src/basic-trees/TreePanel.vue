<script setup lang="ts">
  import Button from '@magic/shared/Button';
  import HStack from '@magic/shared/HStack';
  import Well from '@magic/shared/Well';
  import { useProvidedGraph } from '@magic/shared/product';

  import { useAVLSimulationDefinition } from './simulation/useAVLSimulation.ts';

  const graph = useProvidedGraph();

  const avl = useAVLSimulationDefinition();

  const removeNodeFromAvl = (target: string) => {
    avl.controls.mode.value = 'remove';
    avl.controls.target.value = target;
    graph.magic.simulation.start(avl.definition);
  };
</script>

<template>
  <Well>
    <HStack>
      <Button
        @click="graph.magic.simulation.stop()"
        :disabled="!graph.magic.simulation.current.value"
      >
        Stop Sim
      </Button>
      <Button
        v-for="node in graph.nodes.value"
        @click="removeNodeFromAvl(node.id)"
      >
        Remove Node {{ node.id }}
      </Button>
    </HStack>
  </Well>
</template>
