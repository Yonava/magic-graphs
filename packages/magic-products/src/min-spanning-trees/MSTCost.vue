<script setup lang="ts">
  import { nullThrows } from '@core/utils/assert';
  import WellVue from '@magic/shared/Well';
  import { Explainer, ExplainerText } from '@magic/shared/explainer';
  import { useProvidedGraph } from '@magic/shared/product';

  import { computed } from 'vue';

  const graph = useProvidedGraph();
  const mst = computed(() =>
    nullThrows(
      graph.minimumSpanningTrees.all.value.msts.at(0),
      'no mst in graph!',
    ),
  );

  const mstCostExplainer = computed<Explainer>(() => {
    return { content: 'Hello, this is an explainer' };
  });
</script>

<template>
  <WellVue>
    <ExplainerText :explainer="mstCostExplainer" />
  </WellVue>
</template>
