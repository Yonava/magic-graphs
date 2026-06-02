import type { MagicCanvasProps } from '@magic/canvas/types';

import { BaseEventMap } from './base/events.ts';
import { useBaseGraph } from './base/index.ts';
import { useGraphHelpers } from './helpers/index.ts';
import { NodeAnchorEventMap } from './plugins/anchors/events.ts';
import { useNodeAnchorPlugin } from './plugins/anchors/index.ts';
import { NodeAnchorPlugin } from './plugins/anchors/types.ts';
import { useAnnotations } from './plugins/annotations/index.ts';
import { useCharacteristics } from './plugins/characteristics/index.ts';
import { NodeDragEventMap } from './plugins/drag/events.ts';
import { useNodeDragPlugin } from './plugins/drag/index.ts';
import { NodeDragPlugin } from './plugins/drag/types.ts';
import { FocusEventMap } from './plugins/focus/events.ts';
import { useFocusPlugin } from './plugins/focus/index.ts';
import {
  FocusPlugin,
  FocusTransactionWrapperOptions,
} from './plugins/focus/types.ts';
import { HistoryEventMap } from './plugins/history/events.ts';
import { useHistoryPlugin } from './plugins/history/index.ts';
import {
  HistoryPlugin,
  HistoryTransactionWrapperOptions,
} from './plugins/history/types.ts';
import { useInteractive } from './plugins/interactive/index.ts';
import { useLocalStoragePlugin } from './plugins/localStorage/index.ts';
import { useMarqueePlugin } from './plugins/marquee/index.ts';
import { useShortcuts } from './plugins/shortcut/index.ts';
import type { GraphSettings } from './settings/index.ts';
import { usePreferredTheme } from './themes/usePreferredTheme.ts';
import { useAdjacencyList } from './useAdjacencyList.ts';
import { useTransitionMatrix } from './useTransitionMatrix.ts';

const useGraphWithPlugins = (
  canvas: MagicCanvasProps,
  settings: Partial<GraphSettings> = {},
) => {
  // https://github.com/Yonava/magic-graphs/issues/606
  // TODO get inference to work without explicit type parameters
  const base = useBaseGraph(canvas, settings);

  const baseFocus = useFocusPlugin<{}, BaseEventMap, {}>(base);

  const baseFocusDrag = useNodeDragPlugin<
    FocusTransactionWrapperOptions,
    BaseEventMap & FocusEventMap,
    FocusPlugin
  >(baseFocus);

  const baseFocusDragAnchor = useNodeAnchorPlugin<
    FocusTransactionWrapperOptions,
    BaseEventMap & FocusEventMap & NodeDragEventMap,
    FocusPlugin & NodeDragPlugin
  >(baseFocusDrag);

  const baseFocusDragAnchorHistory = useHistoryPlugin<
    FocusTransactionWrapperOptions,
    BaseEventMap & FocusEventMap & NodeDragEventMap & NodeAnchorEventMap,
    FocusPlugin & NodeDragPlugin & NodeAnchorPlugin
  >(baseFocusDragAnchor);

  const baseFocusDragAnchorHistoryMarquee = useMarqueePlugin<
    FocusTransactionWrapperOptions & HistoryTransactionWrapperOptions,
    BaseEventMap &
      FocusEventMap &
      NodeDragEventMap &
      NodeAnchorEventMap &
      HistoryEventMap,
    FocusPlugin & NodeDragPlugin & NodeAnchorPlugin & HistoryPlugin
  >(baseFocusDragAnchorHistory);

  const baseFocusDragAnchorHistoryMarqueeLocal = useLocalStoragePlugin(
    baseFocusDragAnchorHistoryMarquee,
  );

  return baseFocusDragAnchorHistoryMarqueeLocal;
};

export type GraphWithPlugins = ReturnType<typeof useGraphWithPlugins>;

/**
 * a package brimming with tools for creating and managing graphs bringing
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
  const graph = useGraphWithPlugins(canvas, settings);

  const annotation = useAnnotations(graph);
  const preferredTheme = usePreferredTheme(graph);

  const shortcut = useShortcuts({
    ...graph,
    annotation,
  });

  const helpers = useGraphHelpers(graph);
  const adjacencyList = useAdjacencyList({ graph, helpers });
  const transitionMatrix = useTransitionMatrix({ graph, adjacencyList });

  const characteristics = useCharacteristics({ graph, adjacencyList });

  useInteractive(graph);

  return {
    ...graph,

    // TODO purge from graph layer all together
    annotation,

    // theme and style
    ...preferredTheme,

    // reactive data structures and algorithms
    adjacencyList,
    transitionMatrix,
    characteristics,

    // helper functions
    shortcut,
    helpers,
  };
};
