<script setup lang="ts">
  import colors from '@core/utils/colors';
  import { generateId } from '@core/utils/id';
  import { AggregatorTransformer } from '@graph/plugins/canvas/aggregator/types';
  import { GraphUnderCursor } from '@graph/plugins/canvas/types';
  import { createPhantomAwareEdgeRenderFunction } from '@graph/plugins/phantom/createPhantomAwareEdgeRenderFunction';
  import { CoreEdge } from '@graph/primitives/types';
  import { GraphProduct, useGraphProduct } from '@magic/shared/product';
  import { LensChipDefinition } from '@magic/shared/ui/lens-chips/types';
  import tinycolor from 'tinycolor2';
  import type { DeepReadonly } from 'ts-essentials';

  import { computed } from 'vue';

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
        const msts = computed(() => graph.minimumSpanningTrees.all.value.msts);
        const totalMstCost = computed(
          () => graph.minimumSpanningTrees.all.value.totalWeight,
        );
        const mstConnected = computed(
          () => graph.minimumSpanningTrees.all.value.connected,
        );

        const mstIndexFromId = (edgeId: string) =>
          Number(edgeId.split('-').at(0));
        let activeMstIndex: number | undefined = undefined;
        const noGapRenderer = createPhantomAwareEdgeRenderFunction(graph, {
          parallelEdgeSpacing: 0,
          phantomOnly: true,
          labelled: (edge) => {
            if (msts.value.length < 2) return true;
            const mstIndex = mstIndexFromId(edge.id);
            return mstIndex === activeMstIndex;
          },
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

        const edgeColoring = (edge: CoreEdge) => {
          const mstIndex = mstIndexFromId(edge.id);
          const color = mstIndexToColor(mstIndex);
          if (activeMstIndex !== undefined && activeMstIndex !== mstIndex) {
            return tinycolor(color).setAlpha(0.33).toHex8String();
          }
          return color;
        };

        const edgeThemer = graph.theme.createThemer({
          canvas: {
            'edge.default.color': edgeColoring,
            'edge.hover.color': edgeColoring,
            'edge.default.text.color': edgeColoring,
            'edge.hover.text.color': edgeColoring,
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
          for (let mstIndex = 0; mstIndex < msts.value.length; mstIndex++) {
            for (const edge of msts.value[mstIndex]) {
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
          title: () => {
            return `Unique MSTs: ${msts.value.length}`;
          },
          tooltipLabel: () => {
            return `This graph has ${msts.value.length} unique minimum spanning tree${msts.value.length === 1 ? '' : 's'}.`;
          },
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

        const costChip: LensChipDefinition = {
          title: () => `Total Cost: ${totalMstCost.value.toFraction()}`,
          tooltipLabel:
            'The total cost if you sum up all the edges making up the minimum spanning tree.',
          lens: {
            id: 'total-mst-cost',
            activate: () => {},
            deactivate: () => {},
          },
        };

        const connectedChip: LensChipDefinition = {
          title: () => `Is Connected: ${mstConnected.value ? 'Yes' : 'No'}`,
          tooltipLabel:
            'If the tree is connected it means that one contiguous path of edges can connect all nodes.',
          lens: {
            id: 'is-mst-connected',
            activate: () => {},
            deactivate: () => {},
          },
        };

        return [allMstsChip, costChip, connectedChip];
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
