<script setup lang="ts">
  import colors from '@core/utils/colors';
  import { generateId } from '@core/utils/id';
  import { AggregatorTransformer } from '@graph/plugins/canvas/aggregator/types';
  import { GraphUnderCursor } from '@graph/plugins/canvas/types';
  import { createPhantomAwareEdgeRenderFunction } from '@graph/plugins/phantom/createPhantomAwareEdgeRenderFunction';
  import { GraphProduct, useGraphProduct } from '@magic/shared/product';
  import { LensChipDefinition } from '@magic/shared/ui/lens-chips/types';
  import type { DeepReadonly } from 'ts-essentials';

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

        const MST_COLORS = [
          colors.AMBER_500,
          colors.RED_500,
          colors.BLUE_500,
          colors.GREEN_500,
          colors.EMERALD_600,
          colors.CYAN_500,
          colors.PINK_500,
          colors.ORANGE_500,
          colors.FUCHSIA_500,
          colors.LIME_500,
          colors.ROSE_500,
          colors.PURPLE_500,
          colors.TEAL_500,
        ];

        const mstIndexToColor = (mstIndex: number) =>
          MST_COLORS[mstIndex % MST_COLORS.length];

        const mstEdgeId = (mstIndex: number) => `${mstIndex}-${generateId()}`;
        const mstIndexFromId = (edgeId: string) =>
          Number(edgeId.split('-').at(0));

        let activeMstIndex: number | undefined = undefined;

        const edgeThemer = graph.theme.createThemer({
          canvas: {
            'edge.default.color': (edge) => {
              const mstIndex = mstIndexFromId(edge.id);
              if (activeMstIndex !== undefined && activeMstIndex !== mstIndex) {
                return;
              }
              return mstIndexToColor(mstIndex);
            },
          },
        });

        const setActiveMstIndex = ({
          topElement,
        }: DeepReadonly<GraphUnderCursor>) => {
          activeMstIndex = undefined;
          if (!topElement || !graph.phantom.isEdge(topElement.id)) return;
          activeMstIndex = mstIndexFromId(topElement.id);
        };

        const addPhantomEdges = () => {
          const { msts } = graph.minimumSpanningTrees.all.value;
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
              graph.canvas.events.subscribe(
                'onGraphUnderCursorChange',
                setActiveMstIndex,
              );
            },
            deactivate: () => {
              graph.phantom.removeAllEdges();
              graph.setRenderFunction('edge', defaultRenderer);
              removeEdges = false;
              edgeThemer.deactivate();
              graph.anchors.lifecycle.enable();
              graph.canvas.events.unsubscribe(
                'onGraphUnderCursorChange',
                setActiveMstIndex,
              );
            },
          },
        };

        return [allMstsChip];
      },
    },
  });

  // graph.magic.componentSlots.add({
  //   component: ActiveMST,
  //   id: 'mst-viewer',
  //   position: 'bottom-middle',
  // });
</script>

<template>
  <GraphProduct />
</template>
