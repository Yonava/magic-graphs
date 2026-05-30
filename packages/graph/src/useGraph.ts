import type { MagicCanvasProps } from '@magic/canvas/types';

import { useBaseGraph } from './base/index.ts';
import { useGraphHelpers } from './helpers/index.ts';
import { useNodeAnchors } from './plugins/anchors/index.ts';
import { useAnnotations } from './plugins/annotations/index.ts';
import { useCharacteristics } from './plugins/characteristics/index.ts';
import { useNodeDrag } from './plugins/drag/index.ts';
import { useFocus, useFocusPlugin } from './plugins/focus/index.ts';
import { useHistory, useHistoryPlugin } from './plugins/history/index.ts';
import { useInteractive } from './plugins/interactive/index.ts';
import { useMarquee } from './plugins/marquee/index.ts';
import { usePersistent } from './plugins/persistent/index.ts';
import { useShortcuts } from './plugins/shortcut/index.ts';
import type { GraphSettings } from './settings/index.ts';
import { usePreferredTheme } from './themes/usePreferredTheme.ts';
import { useAdjacencyList } from './useAdjacencyList.ts';
import { useTransitionMatrix } from './useTransitionMatrix.ts';

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
  const baseWithFocus = useHistoryPlugin(
    useFocusPlugin(useBaseGraph(canvas, settings)),
  );

  baseWithFocus.actions.addNode({}, {});
  baseWithFocus.actions.addEdge({}, { edge: 'edge' });

  const history = useHistory(baseWithFocus);
  const marquee = useMarquee({ ...baseWithFocus, focus });
  const nodeAnchors = useNodeAnchors({ ...baseWithFocus, focus });
  const nodeDrag = useNodeDrag({ ...baseWithFocus, nodeAnchors });
  const annotation = useAnnotations(baseWithFocus);
  const persistent = usePersistent(baseWithFocus);
  const preferredTheme = usePreferredTheme(baseWithFocus);

  const shortcut = useShortcuts({
    ...baseWithFocus,
    history,
    focus,
    annotation,
  });

  const helpers = useGraphHelpers(base);
  const adjacencyList = useAdjacencyList({ ...base, helpers });
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
