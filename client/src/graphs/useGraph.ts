import { useBaseGraph } from '@graph/base';
import type { GraphSettings } from '@graph/settings';

import { useMarquee } from '@graph/plugins/marquee';
import { useNodeDrag } from '@graph/plugins/drag';
import { useNodeAnchors } from '@graph/plugins/anchors';
import { useShortcuts } from '@graph/plugins/shortcut';
import { useAnnotations } from '@graph/plugins/annotations';
import { useFocus } from '@graph/plugins/focus';
import { useHistory } from '@graph/plugins/history';
import { usePersistent } from '@graph/plugins/persistent';
import { useInteractive } from '@graph/plugins/interactive';
import { useCharacteristics } from '@graph/plugins/characteristics';

import { usePreferredTheme } from '@graph/themes/usePreferredTheme';
import { useHelpers } from '@graph/helpers/useHelpers';

import { useAdjacencyList } from './useAdjacencyList';
import { useTransitionMatrix } from './useTransitionMatrix';
import type { MagicCanvasProps } from '@canvas/types';

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
