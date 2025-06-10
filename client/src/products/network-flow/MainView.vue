<script setup lang="ts">
  import GraphProduct from '@ui/product/GraphProduct.vue';
  import { useSourceSinkTheme } from './theme/useSourceSinkTheme';
  import { useEdgeThickener } from './theme/useEdgeThickener';
  import { FLOW_GRAPH_SETTINGS, flowNodeLabelGetter } from './settings';
  import FordFulkersonOutput from './ui/FordFulkersonOutput.vue';
  import SourceSinkControls from './ui/SourceSinkControls.vue';
  import { useGraphWithCanvas } from '@product/shared/useGraphWithCanvas';

  const graphWithCanvas = useGraphWithCanvas(FLOW_GRAPH_SETTINGS);
  const { graph } = graphWithCanvas;

  graph.settings.value.newNodeLabelGetter = flowNodeLabelGetter(graph);

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
