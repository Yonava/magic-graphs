import type { MagicCanvasProps } from '@magic/canvas/types';

import { useBaseGraph } from './base/index.ts';
import { useGraphHelpers } from './helpers/index.ts';
import { useNodeAnchors } from './plugins/anchors/index.ts';
import { useAnnotations } from './plugins/annotations/index.ts';
import { useCharacteristics } from './plugins/characteristics/index.ts';
import { useNodeDrag } from './plugins/drag/index.ts';
import { useFocusPlugin } from './plugins/focus/index.ts';
import { useHistoryPlugin } from './plugins/history/index.ts';
import { useInteractive } from './plugins/interactive/index.ts';
import { useMarqueePlugin } from './plugins/marquee/index.ts';
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
  const b = useBaseGraph(canvas, settings);
  const bf = useFocusPlugin(b);
  const bfh = useHistoryPlugin(bf);
  const bfhm = useMarqueePlugin(bfh);

  bfhm.events.subscribe('onUndo', () => {});
  b.actions.addNode({});
  bfhm.actions.addNode({}, { focus: true, history: true });
  bf.actions.removeElements({}, { focus: true, history: true });

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

  const helpers = useGraphHelpers(b);
  const adjacencyList = useAdjacencyList({ ...b, helpers });
  const transitionMatrix = useTransitionMatrix({ ...b, adjacencyList });

  const characteristics = useCharacteristics({ ...b, ...adjacencyList });

  useInteractive(b);

  return {
    ...b,

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
