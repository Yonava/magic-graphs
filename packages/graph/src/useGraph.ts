import type { MagicCanvasProps } from '@magic/canvas/types';

import { CoreEventMap } from './core/events.ts';
import { useCoreGraph } from './core/index.ts';
import { NodeAnchorEventMap } from './plugins/anchors/events.ts';
import { useNodeAnchorPlugin } from './plugins/anchors/index.ts';
import { NodeAnchorPlugin } from './plugins/anchors/types.ts';
import { CanvasEventMap } from './plugins/canvas/events.ts';
import { useCanvasPlugin } from './plugins/canvas/index.ts';
import { usePreferredTheme } from './plugins/canvas/themes/usePreferredTheme.ts';
import { CanvasPlugin } from './plugins/canvas/types.ts';
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
import { useMarqueePlugin } from './plugins/marquee/index.ts';
import { useShortcuts } from './plugins/shortcut/index.ts';
import type { GraphSettings } from './settings/index.ts';
import { useAdjacencyList } from './useAdjacencyList.ts';
import { useTransitionMatrix } from './useTransitionMatrix.ts';

const useGraphWithPlugins = (
  canvas: MagicCanvasProps,
  settings: Partial<GraphSettings> = {},
) => {
  // https://github.com/Yonava/magic-graphs/issues/606
  // TODO get inference to work without explicit type parameters
  const base = useCoreGraph(settings);

  const baseCanvas = useCanvasPlugin<{}, CoreEventMap, {}>(base, canvas);

  const baseCanvasFocus = useFocusPlugin<
    {},
    CoreEventMap & CanvasEventMap,
    CanvasPlugin
  >(baseCanvas);

  const baseCanvasFocusDrag = useNodeDragPlugin<
    FocusTransactionWrapperOptions,
    CoreEventMap & CanvasEventMap & FocusEventMap,
    CanvasPlugin & FocusPlugin
  >(baseCanvasFocus);

  const baseCanvasFocusDragAnchor = useNodeAnchorPlugin<
    FocusTransactionWrapperOptions,
    CoreEventMap & CanvasEventMap & FocusEventMap & NodeDragEventMap,
    CanvasPlugin & FocusPlugin & NodeDragPlugin
  >(baseCanvasFocusDrag);

  const baseCanvasFocusDragAnchorHistory = useHistoryPlugin<
    FocusTransactionWrapperOptions,
    CoreEventMap &
      CanvasEventMap &
      FocusEventMap &
      NodeDragEventMap &
      NodeAnchorEventMap,
    CanvasPlugin & FocusPlugin & NodeDragPlugin & NodeAnchorPlugin
  >(baseCanvasFocusDragAnchor);

  const baseCanvasFocusDragAnchorHistoryMarquee = useMarqueePlugin<
    FocusTransactionWrapperOptions & HistoryTransactionWrapperOptions,
    CoreEventMap &
      CanvasEventMap &
      FocusEventMap &
      NodeDragEventMap &
      NodeAnchorEventMap &
      HistoryEventMap,
    CanvasPlugin &
      FocusPlugin &
      NodeDragPlugin &
      NodeAnchorPlugin &
      HistoryPlugin
  >(baseCanvasFocusDragAnchorHistory);

  return baseCanvasFocusDragAnchorHistoryMarquee;
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

  const preferredTheme = usePreferredTheme(graph);

  const shortcut = useShortcuts(graph);

  const adjacencyList = useAdjacencyList(graph);
  const transitionMatrix = useTransitionMatrix({ graph, adjacencyList });

  const characteristics = useCharacteristics({ graph, adjacencyList });

  useInteractive(graph);

  return {
    ...graph,

    // TODO this belongs in products/shared
    shortcut,

    // theme and style
    ...preferredTheme,

    // reactive data structures and algorithms
    adjacencyList,
    transitionMatrix,
    characteristics,
  };
};
