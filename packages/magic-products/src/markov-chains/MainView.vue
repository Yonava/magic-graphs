<script setup lang="ts">
  import colors from '@core/utils/colors';
  import { Fraction } from 'mathjs';

  import { watch } from 'vue';

  import GraphProduct from '../shared/ui/general/GraphProduct.vue';
  import GButton from '../shared/ui/graph-core/button/GButton.vue';
  import { useGraphWithCanvas } from '../shared/useGraphWithCanvas.ts';
  import { useMarkovChain } from './markov/useMarkovChain.ts';
  import MarkovChainInfo from './ui/MarkovChainInfo.vue';
  import MarkovChainInfoLabels from './ui/MarkovChainInfoLabels.vue';
  import { useMarkovColorizer } from './ui/useMarkovColorizer.ts';

  const graphWithCanvas = useGraphWithCanvas({
    interactive: {
      edgeInputToWeight: (input: string) => {
        // fraction throws an error if the input cannot be parsed or
        // is a divide by zero operation
        try {
          const fraction = new Fraction(input);
          const numericValue = fraction.valueOf();
          // markov chain edges must be between 0 and 1
          if (numericValue <= 0 || numericValue > 1) return;
          return fraction;
        } catch {}
      },
    },
  });
  const { graph } = graphWithCanvas;

  const markov = useMarkovChain(graph);
  useMarkovColorizer(graph, markov).colorize();

  // const int = gsap.utils.interpolate(colors.RED_500, colors.RED_800);

  // const { play, stop } = graph.defineTimeline({
  //   forShapes: ["circle"],
  //   durationMs: 2000,
  //   customInterpolations: {
  //     stroke: {
  //       value: (progress, schema) => ({
  //         color: progress < 0.5 ? int(progress * 2) : int(2 - progress * 2),
  //         lineWidth: schema.stroke?.lineWidth ?? 10,
  //       }),
  //       easing: "in-out",
  //     },
  //   },
  //   synchronize: true,
  // });

  // graph.subscribe("onFocusChange", (newIds, oldIds) => {
  //   const newNodeIds = Array.from(newIds).filter(graph.getNode);
  //   const oldNodeIds = Array.from(oldIds).filter(graph.getNode);
  //   newNodeIds.forEach((nodeId) => {
  //     stop({ shapeId: nodeId });
  //   });
  //   const noLongerFocused = Array.from(oldNodeIds).filter(
  //     (nodeId) => !newNodeIds.includes(nodeId)
  //   );
  //   for (const nodeId of noLongerFocused) {
  //     if (markov.invalidStates.value.has(nodeId)) play({ shapeId: nodeId });
  //   }
  // });

  // watch(markov.invalidStates, () => {
  //   for (const node of graph.nodes.value) {
  //     stop({ shapeId: node.id });
  //     if (markov.invalidStates.value.has(node.id)) play({ shapeId: node.id });
  //   }
  // });

  // const test = () => {
  //   for (const nodeId of markov.invalidStates.value) {
  //     play({ shapeId: nodeId });
  //   }
  // };
</script>

<template>
  <GraphProduct v-bind="graphWithCanvas">
    <template #top-center>
      <MarkovChainInfo :markov="markov" />
      <!-- <GButton @click="test">Test</GButton> -->
    </template>

    <template #bottom-center>
      <MarkovChainInfoLabels :markov="markov" />
    </template>
  </GraphProduct>
</template>
