import type { MagicCanvasProps } from '@magic/canvas/types';
import { canvas } from '@magic/graph-plugins/plugins/canvas/index';
import { history } from '@magic/graph-plugins/plugins/history/index';
import { useCharacteristics } from '@magic/graph/characteristics/index';
import { createGraph } from '@magic/graph/core/index';
import type { GraphSettings } from '@magic/graph/settings/index';
import { useAdjacencyList } from '@magic/graph/useAdjacencyList';
import { useTransitionMatrix } from '@magic/graph/useTransitionMatrix';

import { useInteractive } from './interactive/index.ts';
import { useShortcuts } from './shortcut/index.ts';
import { usePreferredThemePreset } from './usePreferredThemePreset.ts';

const createGraphWithPlugins = (
  magicCanvas: MagicCanvasProps,
  settings: Partial<GraphSettings> = {},
) => {
  const graph = createGraph({
    settings,
    plugins: [canvas(magicCanvas), history],
  });

  graph.events.subscribe('onDraw', (ctx) => {});
  graph.events.subscribe('onNodeMoveStream', (move) => {});
  // graph.events.subscribe('random', () => {});
  graph.canvas;
  graph.history;

  graph.actions.addNode({});

  return graph;
};

export type GraphWithPlugins = ReturnType<typeof createGraphWithPlugins>;
export type GNode = ReturnType<GraphWithPlugins['getNode']>;

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

  const adjacencyList = useAdjacencyList(graph);
  const transitionMatrix = useTransitionMatrix({ graph, adjacencyList });

  const characteristics = useCharacteristics({ graph, adjacencyList });

  useInteractive(graph);

  return {
    ...graph,

    shortcut,
    ...preferredTheme,

    adjacencyList,
    transitionMatrix,
    characteristics,
  };
};
