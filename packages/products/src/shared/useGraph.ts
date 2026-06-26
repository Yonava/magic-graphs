import type { MagicCanvasProps } from '@magic/canvas/types';
import { createGraph } from '@magic/create-graph/index';
import { CoreEdge, CoreNode } from '@magic/graph-core-infra/types';
import { adjacencyLists } from '@magic/graph-plugins/adjacency-lists/index';
import { anchors } from '@magic/graph-plugins/anchors/index';
import { canvas } from '@magic/graph-plugins/canvas/index';
import { characteristics } from '@magic/graph-plugins/characteristics/index';
import { focus } from '@magic/graph-plugins/focus/index';
import { history } from '@magic/graph-plugins/history/index';
import { marquee } from '@magic/graph-plugins/marquee/index';
import { nodeDrag } from '@magic/graph-plugins/node-drag/index';
import { nodeLabel } from '@magic/graph-plugins/node-label/index';
import { transitionMatrix } from '@magic/graph-plugins/transition-matrix/index';
import { dark } from '@magic/graph-theme-presets/dark/index';
import { light } from '@magic/graph-theme-presets/light/index';
import { pink } from '@magic/graph-theme-presets/pink/index';
import type { GraphSettings } from '@magic/graph/settings/index';

import { computed } from 'vue';

import { useInteractive } from './interactive/index.ts';
import { useShortcuts } from './shortcut/index.ts';

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
    themePresets: {
      light,
      dark,
      pink,
    },
  });

  return graph;
};

export type GraphWithPlugins = ReturnType<typeof createGraphWithPlugins>;
export type GNode = ReturnType<GraphWithPlugins['getNode']>;
export type GEdge = ReturnType<GraphWithPlugins['getEdge']>;

export type ThemePreset = ReturnType<
  GraphWithPlugins['theme']['activePresetName']
>;

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

  const activePreset = computed({
    get: () => {
      return graph.theme.activePresetName();
    },
    set: (v) => {
      graph.theme.setActivePreset(v);
    },
  });

  const shortcut = useShortcuts(graph);

  useInteractive(graph);

  return {
    ...graph,
    vue: {
      activePreset,
    },
    shortcut,
  };
};
