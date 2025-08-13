import type { MagicCanvasProps } from '@magic/canvas/types';
import { useBaseGraph } from './base';
import { useHelpers } from './helpers/useHelpers';
import { useNodeAnchors } from './plugins/anchors';
import { useAnnotations } from './plugins/annotations';
import { useCharacteristics } from './plugins/characteristics';
import { useNodeDrag } from './plugins/drag';
import { useFocus } from './plugins/focus';
import { useHistory } from './plugins/history';
import { useInteractive } from './plugins/interactive';
import { useMarquee } from './plugins/marquee';
import { usePersistent } from './plugins/persistent';
import { useShortcuts } from './plugins/shortcut';
import type { GraphSettings } from './settings';
import { usePreferredTheme } from './themes/usePreferredTheme';

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

  const adjacencyList = useAdjacencyList(base);
  const transitionMatrix = useTransitionMatrix({ ...base, adjacencyList });

  const characteristics = useCharacteristics({ ...base, ...adjacencyList });

  useInteractive(base);
  const helpers = useHelpers(base);

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
