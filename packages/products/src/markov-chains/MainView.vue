<script setup lang="ts">
  import { useGraphWithCanvas } from '@product/shared/useGraphWithCanvas';
  import GraphProduct from '@ui/product/GraphProduct.vue';

  import { useMarkovChain } from './markov/useMarkovChain';
  import { MARKOV_CHAIN_GRAPH_SETTINGS } from './settings';
  import MarkovChainInfo from './ui/MarkovChainInfo.vue';
  import MarkovChainInfoLabels from './ui/MarkovChainInfoLabels.vue';
  import { useMarkovColorizer } from './ui/useMarkovColorizer';

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
