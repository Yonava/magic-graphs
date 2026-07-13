<script setup lang="ts">
  import ButtonVue from '@magic/shared/Button';
  import { Lens } from '@magic/shared/lens';
  import { useProvidedGraph } from '@magic/shared/product';
  import { SimulationDefinition } from '@magic/shared/simulation';
  import { useThemer } from '@magic/shared/themer';

  import { defineAsyncComponent } from 'vue';

  const graph = useProvidedGraph();

  const simulation: SimulationDefinition<string> = {
    collectFrames: (collector) => {
      const nodeIds = graph.nodes.value.map((n) => n.id);
      for (const nodeId of nodeIds) {
        collector.add(nodeId);
      }
    },
    initLens: (context) => {
      const fn = (
        { id: nodeId }: { id: string },
        resolveUnderneath: () => number,
      ) => {
        const frameNodeId = context.getCurrentFrame();
        if (nodeId === frameNodeId) return resolveUnderneath() + 20;
      };
      const themer = useThemer(
        {
          canvas: {
            'node.default.size': fn,
          },
          focus: {
            'node.focus.size': fn,
          },
          anchors: {
            'anchors.default.color': 'transparent',
            'anchors.parentFocused.color': 'transparent',
          },
        },
        {
          graph,
        },
      );

      const lens: Lens = {
        id: 'lens-id',
        setup: themer.activate,
        teardown: themer.deactivate,
        components: [
          {
            position: 'bottom-left',
            component: defineAsyncComponent(() => import('./NodeAColor.vue')),
          },
        ],
      };

      return lens;
    },
  };

  const runSimulation = () => {
    graph.magic.simulation.start(simulation);
  };
</script>

<template>
  <ButtonVue @click="runSimulation">Sim</ButtonVue>
</template>
