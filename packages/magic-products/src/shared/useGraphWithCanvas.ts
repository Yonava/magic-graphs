import { useMagicCanvas } from '@magic/canvas/index';
import type { MagicCanvasProps } from '@magic/canvas/types';

import {
  GraphAnnotationsControls,
  useGraphAnnotations,
} from './graph-annotations/index.ts';
import { CreateGraphWithPluginsOptions, useGraph } from './useGraph.ts';

// TODO replace this return type with the final type contract of useGraph
export type Graph = ReturnType<typeof useGraph> & {
  annotations: GraphAnnotationsControls;
};

export type GraphWithCanvas = {
  graph: Graph;
  canvas: MagicCanvasProps;
};

type UseGraphWithCanvas = (
  options?: Omit<CreateGraphWithPluginsOptions, 'canvas'>,
) => GraphWithCanvas;

export const useGraphWithCanvas: UseGraphWithCanvas = (options = {}) => {
  const canvas = useMagicCanvas();
  const graphWithPlugins = useGraph({
    canvas,
    ...options,
  });

  const annotations = useGraphAnnotations(graphWithPlugins);
  const graph = { ...graphWithPlugins, annotations };

  canvas.draw.content.value = graph.canvas.aggregator.draw;

  return {
    canvas,
    graph: { ...graph, annotations },
  };
};
