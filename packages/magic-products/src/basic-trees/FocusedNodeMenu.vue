<script setup lang="ts">
  import Button from '@magic/shared/Button';
  import HStack from '@magic/shared/HStack';
  import Well from '@magic/shared/Well';
  import { GNode } from '@magic/shared/graph';
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

  const node = computed<GNode | undefined>(() => {
    const focusedNodes = graph.focus.focusedNodes.value;
    if (focusedNodes.length !== 1) return;
    return graph.getNode(focusedNodes[0].id);
  });
</script>

<template>
  <Well v-if="node">
    <HStack>
      <Button
        @click="removeNodeFromAvl(node.id)"
        :disabled="!!graph.magic.simulation.current.value"
      >
        Remove {{ node.label }}
      </Button>
    </HStack>
  </Well>
</template>
