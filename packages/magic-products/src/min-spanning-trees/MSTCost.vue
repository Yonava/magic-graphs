<script setup lang="ts">
  import { nullThrows } from '@core/utils/assert';
  import { fractionToDecimal } from '@core/utils/math';
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

  const cost = computed(() => graph.minimumSpanningTrees.all.value.totalWeight);

  const themer = graph.theme.createThemer({
    canvas: {
      'edge.default.color': (edge) => {
        const inMst = mst.value.some((e) => e.id === edge.id);
        return inMst
          ? graph.focus.theme._resolveToken(
              'edge.focus.color',
              graph.getEdge(edge.id),
            )
          : undefined;
      },
    },
  });

  const mstCostExplainer = computed<Explainer>(() => {
    const stringOfPluses = mst.value
      .map((edge) => `{${edge.id}} + `)
      .join('')
      .slice(0, -2);
    return {
      content: `${stringOfPluses} = [${cost.value.toFraction()}]`,
      highlights: [
        {
          tooltipLabel: () => fractionToDecimal(cost.value),
          activate: () => themer.activate(),
          deactivate: () => themer.deactivate(),
        },
      ],
    };
  });
</script>

<template>
  <WellVue>
    <ExplainerText :explainer="mstCostExplainer" />
  </WellVue>
</template>
