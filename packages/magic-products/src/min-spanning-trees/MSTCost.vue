<script setup lang="ts">
  import { nullThrows } from '@core/utils/assert';
  import colors from '@core/utils/colors';
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
      content: `${stringOfPluses} = [${graph.minimumSpanningTrees.all.value.totalWeight.toFraction()}]`,
      highlights: [
        {
          tooltipLabel: () => {
            const [numerator, denominator] =
              graph.minimumSpanningTrees.all.value.totalWeight
                .toFraction()
                .split('/');
            return (
              'Total Cost: ' +
              (Number(numerator) / Number(denominator)).toLocaleString()
            );
          },
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
