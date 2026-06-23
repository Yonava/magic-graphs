import type { MagicCanvasProps } from '@magic/canvas/types';
import { createGraph } from '@magic/create-graph/index';
import { adjacencyLists } from '@magic/graph-plugins/plugins/adjacency-lists/index';
import { anchors } from '@magic/graph-plugins/plugins/anchors/index';
import { canvas } from '@magic/graph-plugins/plugins/canvas/index';
import { characteristics } from '@magic/graph-plugins/plugins/characteristics/index';
import { focus } from '@magic/graph-plugins/plugins/focus/index';
import { history } from '@magic/graph-plugins/plugins/history/index';
import { marquee } from '@magic/graph-plugins/plugins/marquee/index';
import { nodeDrag } from '@magic/graph-plugins/plugins/node-drag/index';
import { nodeLabel } from '@magic/graph-plugins/plugins/node-label/index';
import { transitionMatrix } from '@magic/graph-plugins/plugins/transition-matrix/index';
import type { GraphSettings } from '@magic/graph/settings/index';

import { useInteractive } from './interactive/index.ts';
import { useShortcuts } from './shortcut/index.ts';
import { usePreferredThemePreset } from './usePreferredThemePreset.ts';

const createGraphWithPlugins = (
  magicCanvas: MagicCanvasProps,
  settings: Partial<GraphSettings> = {},
) => {
  const graph = createGraph({
    settings,
    plugins: [
      canvas(magicCanvas),
      history,
      focus,
      marquee,
      anchors,
      nodeDrag,
      nodeLabel,
      adjacencyLists,
      transitionMatrix,
      characteristics,
    ],
  });

  return graph;
};

export type GraphWithPlugins = ReturnType<typeof createGraphWithPlugins>;
export type GNode = ReturnType<GraphWithPlugins['getNode']>;
export type GEdge = ReturnType<GraphWithPlugins['getEdge']>;

/**
 * a hook brimming with tools for creating and managing graphs bringing
 * light and joy to the world
 *
 * @param canvas the HTML canvas element to render the graph onto
 * @param settings default settings for the graph
 * @returns a graph instance with APIs for managing the graph
 */
export const useGraph = (
  canvas: MagicCanvasProps,
  settings: Partial<GraphSettings> = {},
) => {
  const graph = createGraphWithPlugins(canvas, settings);

  const preferredTheme = usePreferredThemePreset(graph);

  const shortcut = useShortcuts(graph);

  useInteractive(graph);

  return {
    ...graph,

    shortcut,
    ...preferredTheme,
  };
};
