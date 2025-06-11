<script setup lang="ts">
  import GraphProduct from '@ui/product/GraphProduct.vue';
  import { MARKOV_CHAIN_GRAPH_SETTINGS } from './settings';
  import MarkovChainInfo from './ui/MarkovChainInfo.vue';
  import { useMarkovChain } from './markov/useMarkovChain';
  import { useMarkovColorizer } from './ui/useMarkovColorizer';
  import MarkovChainInfoLabels from './ui/MarkovChainInfoLabels.vue';
  import { useGraphWithCanvas } from '@product/shared/useGraphWithCanvas';

  const graphWithCanvas = useGraphWithCanvas(MARKOV_CHAIN_GRAPH_SETTINGS);
  const { graph } = graphWithCanvas;

  const markov = useMarkovChain(graph);
  useMarkovColorizer(graph, markov).colorize();
</script>

<template>
  <GraphProduct v-bind="graphWithCanvas">
    <template #top-center>
      <MarkovChainInfo :markov="markov" />
    </template>

    <template #bottom-center>
      <MarkovChainInfoLabels :markov="markov" />
    </template>
  </GraphProduct>
</template>
