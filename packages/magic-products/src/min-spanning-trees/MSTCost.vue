<script setup lang="ts">
  import { nullThrows } from '@core/utils/assert';
  import WellVue from '@magic/shared/Well';
  import { useProvidedGraph } from '@magic/shared/product';
  import { Explainer } from '@magic/shared/simulation';

  import { computed } from 'vue';

  import ExplainerText from '../../../magic-shared/dist/types/components/magic/explainer/ExplainerText.vue';

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
