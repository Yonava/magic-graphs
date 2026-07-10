<script setup lang="ts">
  import { Lens } from '@magic/shared/lens';
  import { useProvidedGraph } from '@magic/shared/product';
  import { useThemer } from '@magic/shared/themer';
  import Button from '@magic/ui/Button';
  import HStack from '@magic/ui/HStack';
  import ToggleButton from '@magic/ui/ToggleButton';
  import Well from '@magic/ui/Well';

  import { defineAsyncComponent, h } from 'vue';

  const graph = useProvidedGraph();

  const toggleTheme = () => {
    const preset = graph.activePreset.value;
    graph.activePreset.value = preset === 'dark' ? 'light' : 'dark';
  };

  const themer = useThemer({
    canvas: {
      'node.default.color': 'red',
    },
  });

  const nodeLens: Lens = {
    id: 'node-color',
    components: [
      {
        component: defineAsyncComponent(() => import('./NodeLens.vue')),
        position: 'left',
      },
      {
        component: defineAsyncComponent(() => import('./NodeLens.vue')),
        position: 'right',
      },
    ],
    setup: themer.activate,
    teardown: themer.deactivate,
  };

  graph.magic.lens.add(nodeLens);
</script>

<template>
  <Well>
    <HStack>
      <ToggleButton @click="">Node Lens</ToggleButton>
      <Button @click="toggleTheme"> Change Theme </Button>
    </HStack>
  </Well>
</template>
