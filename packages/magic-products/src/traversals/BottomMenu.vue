<script setup lang="ts">
  import { Lens } from '@magic/shared/lens';
  import { useProvidedGraph } from '@magic/shared/product';
  import { useThemer } from '@magic/shared/themer';
  import Button from '@magic/ui/Button';
  import HStack from '@magic/ui/HStack';
  import LensChip from '@magic/ui/LensChip';
  import Well from '@magic/ui/Well';

  import { defineAsyncComponent, markRaw } from 'vue';

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
        component: markRaw(
          defineAsyncComponent(() => import('./NodeLens.vue')),
        ),
        position: 'right',
      },
      {
        component: markRaw(
          defineAsyncComponent(() => import('./NodeLens.vue')),
        ),
        position: 'right',
      },
      {
        component: markRaw(
          defineAsyncComponent(() => import('./NodeLens.vue')),
        ),
        position: 'left',
      },
    ],
    setup: themer.activate,
    teardown: themer.deactivate,
  };
</script>

<template>
  <Well>
    <HStack>
      <LensChip
        v-bind="{ lens: nodeLens, title: 'Tip', tooltipContent: 'content ' }"
      />
      <Button @click="toggleTheme"> Change Theme </Button>
    </HStack>
  </Well>
</template>
