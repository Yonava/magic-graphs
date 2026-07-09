import type { MagicCanvasProps } from '@magic/canvas/types';
import { createGraph } from '@magic/create-graph/index';
import { CoreOptions } from '@graph/core/options';
import { adjacencyLists } from '@graph/plugins/adjacency-lists/index';
import { anchors } from '@graph/plugins/anchors/index';
import { canvas } from '@graph/plugins/canvas/index';
import { characteristics } from '@graph/plugins/characteristics/index';
import { focus } from '@graph/plugins/focus/index';
import { history } from '@graph/plugins/history/index';
import { interactive } from '@graph/plugins/interactive/index';
import { InteractiveOptions } from '@graph/plugins/interactive/options';
import { marquee } from '@graph/plugins/marquee/index';
import { nodeDrag } from '@graph/plugins/node-drag/index';
import { nodeLabel } from '@graph/plugins/node-label/index';
import { transitionMatrix } from '@graph/plugins/transition-matrix/index';
import { CoreEdge, CoreNode } from '@graph/primitives/types';
import { dark } from '@graph/theme-presets/dark/index';
import { light } from '@graph/theme-presets/light/index';
import { pink } from '@graph/theme-presets/pink/index';
import { useAdjacencyLists } from '@graph/vue/useAdjacencyLists';
import { useCharacteristics } from '@graph/vue/useCharacteristics';
import { useCreateGraph } from '@graph/vue/useCreateGraph';
import { useTransitionMatrix } from '@graph/vue/useTransitionMatrix';

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
