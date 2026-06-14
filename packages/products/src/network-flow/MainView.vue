<script setup lang="ts">
  import GraphProduct from '../shared/ui/general/GraphProduct.vue';
  import { useGraphWithCanvas } from '../shared/useGraphWithCanvas.ts';
  import { FLOW_GRAPH_SETTINGS } from './settings.ts';
  import { useEdgeThickener } from './theme/useEdgeThickener.ts';
  import { useSourceSinkTheme } from './theme/useSourceSinkTheme.ts';
  import FordFulkersonOutput from './ui/FordFulkersonOutput.vue';
  import SourceSinkControls from './ui/SourceSinkControls.vue';

  const graphWithCanvas = useGraphWithCanvas(FLOW_GRAPH_SETTINGS);
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
