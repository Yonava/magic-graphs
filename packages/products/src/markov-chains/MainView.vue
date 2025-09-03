<script setup lang="ts">
  import { useGraphWithCanvas } from "../shared/useGraphWithCanvas";
  import GraphProduct from "@magic/products/shared/ui/general/GraphProduct.vue";

  import { useMarkovChain } from "./markov/useMarkovChain";
  import { MARKOV_CHAIN_GRAPH_SETTINGS } from "./settings";
  import MarkovChainInfo from "./ui/MarkovChainInfo.vue";
  import MarkovChainInfoLabels from "./ui/MarkovChainInfoLabels.vue";
  import { useMarkovColorizer } from "./ui/useMarkovColorizer";
  import { watch } from "vue";
  import GButton from "@magic/products/shared/ui/graph-core/button/GButton.vue";
  import gsap from "gsap";
  import colors from "@magic/utils/colors";

  const graphWithCanvas = useGraphWithCanvas(MARKOV_CHAIN_GRAPH_SETTINGS);
  const { graph } = graphWithCanvas;

  const markov = useMarkovChain(graph);
  useMarkovColorizer(graph, markov).colorize();

  const int = gsap.utils.interpolate(colors.RED_500, colors.RED_800);

  const { play, stop } = graph.defineTimeline({
    forShapes: ["circle"],
    durationMs: 2000,
    customInterpolations: {
      stroke: {
        value: (progress, schema) => ({
          color: progress < 0.5 ? int(progress * 2) : int(2 - progress * 2),
          lineWidth: schema.stroke?.lineWidth ?? 10,
        }),
        easing: "in-out",
      },
    },
    synchronize: true,
  });

  graph.subscribe("onFocusChange", (newIds, oldIds) => {
    const newNodeIds = Array.from(newIds).filter(graph.getNode);
    const oldNodeIds = Array.from(oldIds).filter(graph.getNode);
    newNodeIds.forEach((nodeId) => {
      stop({ shapeId: nodeId });
    });
    const noLongerFocused = Array.from(oldNodeIds).filter(
      (nodeId) => !newNodeIds.includes(nodeId)
    );
    for (const nodeId of noLongerFocused) {
      if (markov.invalidStates.value.has(nodeId)) play({ shapeId: nodeId });
    }
  });

  watch(markov.invalidStates, () => {
    for (const node of graph.nodes.value) {
      stop({ shapeId: node.id });
      if (markov.invalidStates.value.has(node.id)) play({ shapeId: node.id });
    }
  });

  const test = () => {
    for (const nodeId of markov.invalidStates.value) {
      play({ shapeId: nodeId });
    }
  };
</script>

<template>
  <GraphProduct v-bind="graphWithCanvas">
    <template #top-center>
      <MarkovChainInfo :markov="markov" />
      <GButton @click="test">Test</GButton>
    </template>

    <template #bottom-center>
      <MarkovChainInfoLabels :markov="markov" />
    </template>
  </GraphProduct>
</template>
