import type { MagicCanvasProps } from '@magic/canvas/types';

import { BaseEventMap } from './base/events.ts';
import { useBaseGraph } from './base/index.ts';
import { useGraphHelpers } from './helpers/index.ts';
import { useNodeAnchors } from './plugins/anchors/index.ts';
import { useAnnotations } from './plugins/annotations/index.ts';
import { useCharacteristics } from './plugins/characteristics/index.ts';
import { useNodeDrag } from './plugins/drag/index.ts';
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
  const baseFocusHistory = useHistoryPlugin<
    FocusTransactionWrapperOptions,
    BaseEventMap & FocusEventMap,
    FocusPlugin
  >(baseFocus);
  const baseFocusHistoryMarquee = useMarqueePlugin<
    FocusTransactionWrapperOptions & HistoryTransactionWrapperOptions,
    BaseEventMap & FocusEventMap & HistoryEventMap,
    FocusPlugin & HistoryPlugin
  >(baseFocusHistory);
  const baseFocusHistoryMarqueeLocal = useLocalStoragePlugin(
    baseFocusHistoryMarquee,
  );

  // ---------- TYPE TESTING
  base.events.subscribe('onClick', (click) => {});
  baseFocus.events.subscribe('onClick', (click) => {});
  baseFocusHistory.events.subscribe('onClick', (click) => {});
  baseFocusHistoryMarquee.events.subscribe('onClick', (click) => {});
  baseFocusHistoryMarqueeLocal.events.subscribe('onClick', (click) => {});

  base.actions.addNode({});
  baseFocusHistoryMarquee.actions.addNode({}, { history: true });
  baseFocusHistory.actions.removeElements({}, { history: false });
  baseFocusHistoryMarqueeLocal.localStorage.save;
  // ---------- TYPE TESTING

  return baseFocusHistoryMarqueeLocal;
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

  const nodeAnchors = useNodeAnchors(graph);
  const nodeDrag = useNodeDrag(graph);
  const annotation = useAnnotations(graph);
  const preferredTheme = usePreferredTheme(graph);

  const shortcut = useShortcuts({
    ...graph,
    annotation,
  });

  const helpers = useGraphHelpers(graph);
  const adjacencyList = useAdjacencyList({ ...graph, helpers });
  const transitionMatrix = useTransitionMatrix({ ...base, adjacencyList });

  const characteristics = useCharacteristics({ ...base, ...adjacencyList });

  useInteractive(base);

  return {
    ...base,

    // plugin controllers
    focus,
    history,
    marquee,
    nodeDrag,
    nodeAnchors,
    annotation,
    persistent,

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
