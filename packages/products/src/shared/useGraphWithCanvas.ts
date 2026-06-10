import { useMagicCanvas } from '@magic/canvas/index';
import type { MagicCanvasProps } from '@magic/canvas/types';
import type { GraphSettings } from '@magic/graph/settings/index';
import { useGraph } from '@magic/graph/useGraph';
import { cross } from '@magic/shapes/shapes/cross/index';

import type { StyleValue } from 'vue';
import { computed } from 'vue';
import type { ComputedRef } from 'vue';

import {
  GraphAnnotationsControls,
  useGraphAnnotations,
} from './graph-annotations/index.ts';
import { useGraphCanvasColor } from './useGraphCanvasColor.ts';

type GraphCanvasCSS = { style: StyleValue };

// TODO replace this return type with the final type contract of useGraph
export type Graph = ReturnType<typeof useGraph> & {
  annotations: GraphAnnotationsControls;
};

export type GraphWithCanvas = {
  graph: Graph;
  canvas: MagicCanvasProps;
  css: ComputedRef<GraphCanvasCSS>;
};

type UseGraphWithCanvas = (settings: Partial<GraphSettings>) => GraphWithCanvas;

export const useGraphWithCanvas: UseGraphWithCanvas = (
  settings: Partial<GraphSettings> = {},
) => {
  const canvas = useMagicCanvas();
  const graphWithPlugins = useGraph(canvas, settings);

  const annotations = useGraphAnnotations(graphWithPlugins);
  const graph = { ...graphWithPlugins, annotations };

  const { bgColor, patternColor } = useGraphCanvasColor(graph);

  canvas.draw.content.value = graph.canvas.aggregator.draw;
  canvas.draw.backgroundPattern.value = (ctx, at, alpha) =>
    cross({
      at,
      size: 12,
      lineWidth: 1,
      fillColor: patternColor.value + alpha,
    }).draw(ctx);

  const css = computed<GraphCanvasCSS>(() => ({
    style: {
      backgroundColor: bgColor.value,
    },
  }));

  return {
    canvas,
    graph: { ...graph, annotations },
    css,
  };
};
