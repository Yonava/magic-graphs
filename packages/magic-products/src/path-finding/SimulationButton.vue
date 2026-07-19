<script setup lang="ts">
  import colors from '@core/utils/colors';
  import ButtonVue from '@magic/shared/Button';
  import { Lens } from '@magic/shared/lens';
  import { useProvidedGraph } from '@magic/shared/product';
  import {
    ExplainerHighlight,
    SimulationDefinition,
  } from '@magic/shared/simulation';
  import { createThemer } from '@magic/shared/themer/useThemer';

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
      console.log('Setup!');

      const fn = (
        { id: nodeId }: { id: string },
        resolveUnderneath: () => number,
      ) => {
        const frameNodeId = context.currentFrame.value;
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
      };

      return {
        onTeardownCompleted: () => {
          console.log('Torn Down!');
          explainerThemer.deactivate();
        },
        onFrameTransition: (newFrame, oldFrame) => {
          console.log(
            `${graph.nodeLabel.get(oldFrame)} -> ${graph.nodeLabel.get(newFrame)}`,
          );
        },
        lens,
        explainer: (nodeId) => {
          const nodeLabel = graph.nodeLabel.get(nodeId);
          nodeIdBox.value = nodeId;
          return {
            content: () =>
              `Looking at [Node ${nodeLabel}]. All Nodes: ${graph.nodes.value.map((n) => `[${graph.getNode(n.id).label}]`)}`,
            highlights: () => [
              {
                ...explainerThemer,
                classes: () =>
                  graph.theme.activePresetName.value === 'light'
                    ? 'bg-purple-500 hover:bg-pink-500'
                    : 'bg-red-500 hover:bg-blue-500',
                tooltipLabel: () => graph.edges.value.length.toString(),
              },
              ...graph.nodes.value.map((n): ExplainerHighlight => ({
                activate: () => {
                  nodeIdBox.value = n.id;
                  explainerThemer.activate();
                },
                deactivate: explainerThemer.deactivate,
                classes: nodeId === n.id ? 'bg-red-500' : undefined,
              })),
            ],
          };
        },
      };
    },
  };

  const toggleSim = () => {
    if (graph.magic.simulation.current.value) {
      graph.magic.simulation.stop();
      return;
    }
    graph.magic.simulation.start(simulation);
  };
</script>

<template>
  <ButtonVue @click="toggleSim"
    >{{
      graph.magic.simulation.current.value ? 'Stop' : 'Start'
    }}
    Simulation</ButtonVue
  >
</template>
