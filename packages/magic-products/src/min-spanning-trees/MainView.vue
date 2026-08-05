<script setup lang="ts">
  import colors from '@core/utils/colors';
  import { generateId } from '@core/utils/id';
  import { AggregatorTransformer } from '@graph/plugins/canvas/aggregator/types';
  import { createPhantomAwareEdgeRenderFunction } from '@graph/plugins/phantom/createPhantomAwareEdgeRenderFunction';
  import { GraphProduct, useGraphProduct } from '@magic/shared/product';
  import { LensChipDefinition } from '@magic/shared/ui/lens-chips/types';

  import ActiveMST from './ActiveMST.vue';
  import { manifest } from './manifest.ts';

  const graph = useGraphProduct({
    manifest,
    core: {
      directed: false,
    },
    interactive: {
      allowSelfLoops: false,
    },
    ui: {
      lensChips: (graph) => {
        const noGapRenderer = createPhantomAwareEdgeRenderFunction(graph, {
          parallelEdgeSpacing: 0,
          phantomOnly: true,
        });
        const defaultRenderer = createPhantomAwareEdgeRenderFunction(graph);
        let removeEdges = false;
        const removeNonPhantomEdges: AggregatorTransformer = (agg) => {
          if (!removeEdges) return agg;
          return agg.filter((el) => !graph.isEdge(el.id));
        };
        graph.canvas.aggregator.transformers.push(removeNonPhantomEdges);

        const mstColors = [
          colors.AMBER_500,
          colors.RED_500,
          colors.BLUE_500,
          colors.GREEN_500,
        ];

        const mstIndexToColor = (mstIndex: number) =>
          mstColors[mstIndex % mstColors.length];

        const mstEdgeId = (mstIndex: number) => `${mstIndex}-${generateId()}`;
        const mstIndexFromId = (edgeId: string) =>
          Number(edgeId.split('-').at(0));

        const edgeThemer = graph.theme.createThemer({
          canvas: {
            'edge.default.color': (edge) => {
              const mstIndex = mstIndexFromId(edge.id);
              return mstIndexToColor(mstIndex);
            },
          },
        });

        const addPhantomEdges = () => {
          const { msts } = graph.minimumSpanningTrees.all.value;
          console.log(msts);
          for (let mstIndex = 0; mstIndex < msts.length; mstIndex++) {
            for (const edge of msts[mstIndex]) {
              graph.phantom.addEdge({
                id: mstEdgeId(mstIndex),
                source: edge.source,
                target: edge.target,
                label: edge.weight.toFraction(),
              });
            }
          }
        };
        const allMstsChip: LensChipDefinition = {
          title: 'All MSTs',
          tooltipLabel: 'View all minimum spanning trees',
          lens: {
            id: 'all-msts',
            activate: () => {
              addPhantomEdges();
              graph.setRenderFunction('edge', noGapRenderer);
              removeEdges = true;
              edgeThemer.activate();
              graph.anchors.lifecycle.disable();
            },
            deactivate: () => {
              graph.phantom.removeAllEdges();
              graph.setRenderFunction('edge', defaultRenderer);
              removeEdges = false;
              edgeThemer.deactivate();
              graph.anchors.lifecycle.enable();
            },
          },
        };

        return [allMstsChip];
      },
    },
  });

  graph.magic.componentSlots.add({
    component: ActiveMST,
    id: 'mst-viewer',
    position: 'bottom-middle',
  });
</script>

<template>
  <GraphProduct />
</template>
