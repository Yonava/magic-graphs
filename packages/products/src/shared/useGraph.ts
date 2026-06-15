import type { MagicCanvasProps } from '@magic/canvas/types';
import { createNodeLabel } from '@magic/graph-plugins/plugins/node-label/index';
import { useCharacteristics } from '@magic/graph/characteristics/index';
import { CoreEventMap } from '@magic/graph/core/events';
import { useCoreGraph } from '@magic/graph/core/index';
import { NodeAnchorEventMap } from '@magic/graph/plugins/anchors/events';
import { useNodeAnchorPlugin } from '@magic/graph/plugins/anchors/index';
import { NodeAnchorPlugin } from '@magic/graph/plugins/anchors/types';
import { CanvasEventMap } from '@magic/graph/plugins/canvas/events';
import { canvas } from '@magic/graph/plugins/canvas/index';
import { CanvasPlugin } from '@magic/graph/plugins/canvas/types';
import { NodeDragEventMap } from '@magic/graph/plugins/drag/events';
import { useNodeDragPlugin } from '@magic/graph/plugins/drag/index';
import { NodeDragPlugin } from '@magic/graph/plugins/drag/types';
import { FocusEventMap } from '@magic/graph/plugins/focus/events';
import { useFocusPlugin } from '@magic/graph/plugins/focus/index';
import {
  FocusPlugin,
  FocusTransactionWrapperOptions,
} from '@magic/graph/plugins/focus/types';
import { HistoryEventMap } from '@magic/graph/plugins/history/events';
import { useHistoryPlugin } from '@magic/graph/plugins/history/index';
import {
  HistoryPlugin,
  HistoryTransactionWrapperOptions,
} from '@magic/graph/plugins/history/types';
import { MarqueeEventMap } from '@magic/graph/plugins/marquee/events';
import { useMarqueePlugin } from '@magic/graph/plugins/marquee/index';
import { MarqueePlugin } from '@magic/graph/plugins/marquee/types';
import type { GraphSettings } from '@magic/graph/settings/index';
import { useAdjacencyList } from '@magic/graph/useAdjacencyList';
import { useTransitionMatrix } from '@magic/graph/useTransitionMatrix';

import { useInteractive } from './interactive/index.ts';
import { useShortcuts } from './shortcut/index.ts';
import { usePreferredThemePreset } from './usePreferredThemePreset.ts';

const useGraphWithPlugins = (
  canvas: MagicCanvasProps,
  settings: Partial<GraphSettings> = {},
) => {
  // https://github.com/Yonava/magic-graphs/issues/606
  // TODO get inference to work without explicit type parameters
  const base = useCoreGraph(settings);

  const baseCanvas = canvas<{}, CoreEventMap, {}>(base, canvas);

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

  return createNodeLabel<
    FocusTransactionWrapperOptions & HistoryTransactionWrapperOptions,
    CoreEventMap &
      CanvasEventMap &
      FocusEventMap &
      NodeDragEventMap &
      NodeAnchorEventMap &
      HistoryEventMap &
      MarqueeEventMap,
    CanvasPlugin &
      FocusPlugin &
      NodeDragPlugin &
      NodeAnchorPlugin &
      HistoryPlugin &
      MarqueePlugin
  >(baseCanvasFocusDragAnchorHistoryMarquee);
};

export type GraphWithPlugins = ReturnType<typeof useGraphWithPlugins>;
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
  const graph = useGraphWithPlugins(canvas, settings);

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
