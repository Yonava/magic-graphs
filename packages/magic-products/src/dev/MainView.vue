<script setup lang="ts">
  import { AggregatorTransformer } from '@graph/plugins/canvas/aggregator/types';
  import { createPhantomAwareEdgeRenderFunction } from '@graph/plugins/phantom/createPhantomAwareEdgeRenderFunction';
  import { GraphProduct, useGraphProduct } from '@magic/shared/product';

  import { onMounted } from 'vue';

  import ActionBar from './ActionBar.vue';
  import { manifest } from './manifest.ts';

  const graph = useGraphProduct({
    manifest,
    core: {
      directed: true,
    },
    ui: {
      debug: true,
      lensChips: (graph) => {
        const noGapRenderer = createPhantomAwareEdgeRenderFunction(graph, {
          parallelEdgeSpacing: 0,
          phantomOnly: true,
        });
        const defaultRenderer = createPhantomAwareEdgeRenderFunction(graph);
        let flag = false;
        const removeNonPhantomEdges: AggregatorTransformer = (agg) => {
          if (!flag) return agg;
          return agg.filter((el) => !graph.isEdge(el.id));
        };
        graph.canvas.aggregator.transformers.push(removeNonPhantomEdges);
        return [
          {
            lens: {
              activate: () => {
                flag = true;
                graph.anchors.lifecycle.disable();
                graph.setRenderFunction('edge', noGapRenderer);
              },
              deactivate: () => {
                flag = false;
                graph.anchors.lifecycle.enable();
                graph.setRenderFunction('edge', defaultRenderer);
              },
              id: 'no-gap',
            },
            title: 'No Gap',
          },
        ];
      },
    },
  });

  graph.magic.componentSlots.add({
    id: 'action-bar',
    component: ActionBar,
    position: 'bottom-middle',
  });

  graph.phantom.addNode({
    id: 'phantom-node-1',
    position: { x: 850, y: 430 },
    label: 'A!',
  });
  graph.phantom.addNode({
    id: 'phantom-node-2',
    position: { x: 850, y: 30 },
    label: 'B!',
  });

  onMounted(() => {
    const a = graph.nodes.value.find((n) => n.label === 'A')?.id!;
    const c = graph.nodes.value.find((n) => n.label === 'C')?.id!;
    graph.phantom.addEdge({
      id: 'phantom-edge-1',
      source: a,
      target: c,
      label: 'ABC',
    });
  });
</script>

<template>
  <GraphProduct />
</template>
