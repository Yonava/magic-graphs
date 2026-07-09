import type { MagicCanvasProps } from '@magic/canvas/types';
import { createGraph } from '@magic/create-graph/index';
import { CoreOptions } from '@magic/graph-core/options';
import { adjacencyLists } from '@magic/graph-plugins/adjacency-lists/index';
import { anchors } from '@magic/graph-plugins/anchors/index';
import { canvas } from '@magic/graph-plugins/canvas/index';
import { characteristics } from '@magic/graph-plugins/characteristics/index';
import { focus } from '@magic/graph-plugins/focus/index';
import { history } from '@magic/graph-plugins/history/index';
import { interactive } from '@magic/graph-plugins/interactive/index';
import { InteractiveOptions } from '@magic/graph-plugins/interactive/options';
import { marquee } from '@magic/graph-plugins/marquee/index';
import { nodeDrag } from '@magic/graph-plugins/node-drag/index';
import { nodeLabel } from '@magic/graph-plugins/node-label/index';
import { transitionMatrix } from '@magic/graph-plugins/transition-matrix/index';
import { CoreEdge, CoreNode } from '@magic/graph-primitives/types';
import { dark } from '@magic/graph-theme-presets/dark/index';
import { light } from '@magic/graph-theme-presets/light/index';
import { pink } from '@magic/graph-theme-presets/pink/index';
import { useAdjacencyLists } from '@magic/graph-vue/useAdjacencyLists';
import { useCharacteristics } from '@magic/graph-vue/useCharacteristics';
import { useCreateGraph } from '@magic/graph-vue/useCreateGraph';
import { useTransitionMatrix } from '@magic/graph-vue/useTransitionMatrix';

import { useShortcuts } from './shortcut/index.ts';

export type CreateGraphWithPluginsOptions = {
  core?: Partial<CoreOptions>;
  interactive?: Partial<InteractiveOptions>;
  canvas: MagicCanvasProps;
};

const createGraphWithPlugins = (options: CreateGraphWithPluginsOptions) => {
  const graph = createGraph({
    options: options.core ?? {},
    plugins: [
      canvas(options.canvas),
      history,
      focus,
      marquee,
      anchors,
      nodeDrag,
      nodeLabel,
      adjacencyLists,
      transitionMatrix,
      characteristics,
      interactive(options.interactive ?? {}),
    ],
    themePresets: {
      dark,
      light,
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
export const useGraph = (options: CreateGraphWithPluginsOptions) => {
  const graph = createGraphWithPlugins(options);

  // @ts-expect-error event hub type contravariance causing issues with strong typing
  const coreWrapper = useCreateGraph(graph);
  // @ts-expect-error event hub type contravariance causing issues with strong typing
  const adjacencyLists = useAdjacencyLists(graph);
  // @ts-expect-error event hub type contravariance causing issues with strong typing
  const characteristics = useCharacteristics(graph);
  // @ts-expect-error event hub type contravariance causing issues with strong typing
  const transitionMatrix = useTransitionMatrix(graph);

  const shortcut = useShortcuts(graph);

  return {
    ...graph,
    adjacencyLists,
    characteristics,
    transitionMatrix,
    ...coreWrapper,
    shortcut,
  };
};
