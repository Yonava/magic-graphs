import type { MagicCanvasProps } from '@magic/canvas/types';
import { createGraph } from '@magic/create-graph/index';
import { LooseGraphPlugin } from '@magic/graph/plugins/types';
import type { GraphSettings } from '@magic/graph/settings/index';
import { Prettify, UnionToIntersection } from 'ts-essentials';

import { ThemeController } from '../../../graph-plugins-shared/src/theme/createThemeController.ts';
import { adjacencyLists } from '../../../graph-plugins/dist/types/adjacency-lists/index.ts';
import { anchors } from '../../../graph-plugins/dist/types/anchors/index.ts';
import { canvas } from '../../../graph-plugins/dist/types/canvas/index.ts';
import { CanvasPlugin } from '../../../graph-plugins/dist/types/canvas/types.ts';
import { characteristics } from '../../../graph-plugins/dist/types/characteristics/index.ts';
import { focus } from '../../../graph-plugins/dist/types/focus/index.ts';
import { FocusPlugin } from '../../../graph-plugins/dist/types/focus/types.ts';
import { history } from '../../../graph-plugins/dist/types/history/index.ts';
import { marquee } from '../../../graph-plugins/dist/types/marquee/index.ts';
import { nodeDrag } from '../../../graph-plugins/dist/types/node-drag/index.ts';
import { nodeLabel } from '../../../graph-plugins/dist/types/node-label/index.ts';
import { transitionMatrix } from '../../../graph-plugins/dist/types/transition-matrix/index.ts';
import { useInteractive } from './interactive/index.ts';
import { useShortcuts } from './shortcut/index.ts';
import { usePreferredThemePreset } from './usePreferredThemePreset.ts';

type t = ThemesForPlugins<[FocusPlugin, CanvasPlugin]>;

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
