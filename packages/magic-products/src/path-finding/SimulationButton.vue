<script setup lang="ts">
  import colors from '@core/utils/colors';
  import ButtonVue from '@magic/shared/Button';
  import { Lens } from '@magic/shared/lens';
  import { useProvidedGraph } from '@magic/shared/product';
  import { SimulationDefinition } from '@magic/shared/simulation';
  import { createThemer } from '@magic/shared/themer/useThemer';

  import { defineAsyncComponent } from 'vue';

  const graph = useProvidedGraph();

  const nodeIdBox = { value: '' };
  const explainerThemer = createThemer(graph, {
    canvas: {
      'node.default.border.color': ({ id }) =>
        nodeIdBox.value === id ? colors.AMBER_500 : undefined,
    },
  });

  const simulation: SimulationDefinition<string> = {
    collectFrames: (collector) => {
      const nodeIds = graph.nodes.value.map((n) => n.id);
      for (const nodeId of nodeIds) {
        collector.add(nodeId);
      }
    },
    setup: (context) => {
      const fn = (
        { id: nodeId }: { id: string },
        resolveUnderneath: () => number,
      ) => {
        const frameNodeId = context.getCurrentFrame();
        if (nodeId === frameNodeId) return resolveUnderneath() + 20;
      };
      const themer = createThemer(graph, {
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
      });

      const lens: Lens = {
        id: 'lens-id',
        activate: themer.activate,
        deactivate: themer.deactivate,
        components: [
          {
            position: 'center-left',
            component: defineAsyncComponent(() => import('./NodeAColor.vue')),
          },
        ],
      };

      return {
        lens,
        explainer: (nodeId) => {
          const nodeLabel = graph.nodeLabel.get(nodeId);
          nodeIdBox.value = nodeId;
          return {
            content: `Looking at [Node ${nodeLabel}]`,
            highlights: [
              {
                ...explainerThemer,
                classes: 'bg-red-500 hover:bg-blue-500',
              },
            ],
          };
        },
      };
    },
    teardown: () => {
      explainerThemer.deactivate();
    },
  };

  const runSimulation = () => {
    graph.magic.simulation.start(simulation);
  };
</script>

<template>
  <ButtonVue @click="runSimulation">Start Simulation</ButtonVue>
</template>
