<script setup lang="ts">
  import { Fraction } from 'mathjs';

  import GraphProduct from '../shared/ui/general/GraphProduct.vue';
  import { useGraphWithCanvas } from '../shared/useGraphWithCanvas.ts';
  import { useEdgeThickener } from './theme/useEdgeThickener.ts';
  import { useSourceSinkTheme } from './theme/useSourceSinkTheme.ts';
  import FordFulkersonOutput from './ui/FordFulkersonOutput.vue';
  import SourceSinkControls from './ui/SourceSinkControls.vue';

  const graphWithCanvas = useGraphWithCanvas({
    interactive: {
      addedEdgeWeight: () => new Fraction(5),
      addedEdgeRuleNoSelfLoops: true,
      addedEdgeRuleOneEdgePerPath: true,
      edgeInputToWeight: (input: string) => {
        // fraction throws an error if the input cannot be parsed or
        // is a divide by zero operation
        try {
          const fraction = new Fraction(input);
          const numericValue = fraction.valueOf();
          if (numericValue <= 0) return;
          return fraction;
        } catch {}
      },
    },
  });
  const { graph } = graphWithCanvas;

  const { activate: activateEdgeThickener } = useEdgeThickener(graph);
  const { stylize: activateFlowColorizer } = useSourceSinkTheme(graph);

  activateEdgeThickener();
  activateFlowColorizer();
</script>

<template>
  <GraphProduct v-bind="graphWithCanvas">
    <template #top-center>
      <FordFulkersonOutput />
      <SourceSinkControls />
    </template>
  </GraphProduct>
</template>
