<script setup lang="ts">
  import Button from '@magic/shared/Button';
  import HStack from '@magic/shared/HStack';
  import Well from '@magic/shared/Well';
  import { useProvidedGraph } from '@magic/shared/product';

  import { computed } from 'vue';

  import { useAVLSimulationDefinition } from './simulation/useAVLSimulation.ts';

  const graph = useProvidedGraph();

  const avl = useAVLSimulationDefinition();

  const removeNodeFromAvl = (target: string) => {
    avl.controls.mode.value = 'remove';
    avl.controls.target.value = target;
    graph.magic.simulation.start(avl.definition);
  };

  const nodesToRemove = computed(() => {
    return graph.nodes.value
      .filter((n) => !avl.suggested.ids.value.has(n.id))
      .map((n) => graph.getNode(n.id));
  });
</script>

<template>
  <Well v-if="nodesToRemove.length > 0">
    <HStack>
      <Button
        v-for="node in nodesToRemove"
        @click="removeNodeFromAvl(node.id)"
        :disabled="!!graph.magic.simulation.current.value"
      >
        Remove {{ node.label }}
      </Button>
    </HStack>
  </Well>
</template>
