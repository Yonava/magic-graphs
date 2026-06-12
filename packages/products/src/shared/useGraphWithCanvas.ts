import { useMagicCanvas } from '@magic/canvas/index';
import type { MagicCanvasProps } from '@magic/canvas/types';
import type { GraphSettings } from '@magic/graph/settings/index';
import { useGraph } from '@magic/graph/useGraph';

import {
  GraphAnnotationsControls,
  useGraphAnnotations,
} from './graph-annotations/index.ts';

// TODO replace this return type with the final type contract of useGraph
export type Graph = ReturnType<typeof useGraph> & {
  annotations: GraphAnnotationsControls;
};

export type GraphWithCanvas = {
  graph: Graph;
  canvas: MagicCanvasProps;
};

type UseGraphWithCanvas = (settings: Partial<GraphSettings>) => GraphWithCanvas;

export const useGraphWithCanvas: UseGraphWithCanvas = (
  settings: Partial<GraphSettings> = {},
) => {
  const canvas = useMagicCanvas();
  const graphWithPlugins = useGraph(canvas, settings);

  const annotations = useGraphAnnotations(graphWithPlugins);
  const graph = { ...graphWithPlugins, annotations };

  canvas.draw.content.value = graph.canvas.aggregator.draw;

  return {
    canvas,
    graph: { ...graph, annotations },
  };
};
