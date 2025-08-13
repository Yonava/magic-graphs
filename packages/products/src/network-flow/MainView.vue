<script setup lang="ts">
  import { useGraphWithCanvas } from '@product/shared/useGraphWithCanvas';
  import GraphProduct from '@ui/product/GraphProduct.vue';

  import { FLOW_GRAPH_SETTINGS, flowNodeLabelGetter } from './settings';
  import { useEdgeThickener } from './theme/useEdgeThickener';
  import { useSourceSinkTheme } from './theme/useSourceSinkTheme';
  import FordFulkersonOutput from './ui/FordFulkersonOutput.vue';
  import SourceSinkControls from './ui/SourceSinkControls.vue';

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
