import type { MagicCanvasProps } from '@magic/canvas/types';

import { useBaseGraph } from './base';
import { useGraphHelpers } from './helpers';
import { useNodeAnchors } from './plugins/anchors.ts';
import { useAnnotations } from './plugins/annotations.ts';
import { useCharacteristics } from './plugins/characteristics.ts';
import { useNodeDrag } from './plugins/drag.ts';
import { useFocus } from './plugins/focus.ts';
import { useHistory } from './plugins/history.ts';
import { useInteractive } from './plugins/interactive.ts';
import { useMarquee } from './plugins/marquee.ts';
import { usePersistent } from './plugins/persistent.ts';
import { useShortcuts } from './plugins/shortcut.ts';
import type { GraphSettings } from './settings';
import { usePreferredTheme } from './themes/usePreferredTheme.ts';
import { useAdjacencyList } from './useAdjacencyList';
import { useTransitionMatrix } from './useTransitionMatrix';

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
  const base = useBaseGraph(canvas, settings);

  const focus = useFocus(base);
  const history = useHistory(base);
  const marquee = useMarquee({ ...base, focus });
  const nodeAnchors = useNodeAnchors({ ...base, focus });
  const nodeDrag = useNodeDrag({ ...base, nodeAnchors });
  const annotation = useAnnotations(base);
  const persistent = usePersistent(base);
  const preferredTheme = usePreferredTheme(base);

  const shortcut = useShortcuts({
    ...base,
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
