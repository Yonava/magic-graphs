import { useTheme } from '@magic/graph/themes/useTheme';
import type { GEdge, Graph } from '@magic/graph/types';

import { onUnmounted } from 'vue';

import { FLOW_USETHEME_ID } from '../constants';

const MIN_THICKNESS = 5;
const MAX_THICKNESS = 25;

/**
 * when the edge weight is 0, the edge thickness is set to this value
 */
const ZERO_THICKNESS = 1;

/**
 * hooks into the graph with useTheme to adjust the thickness of edges
 * based on their weight
 */
export const useEdgeThickener = (graph: Graph, themeId = FLOW_USETHEME_ID) => {
  const { setTheme, removeTheme } = useTheme(graph, themeId);
  const { getEdgeWeight } = graph.helpers;

  const thickener = (edge: GEdge) => {
    const edgeWeight = getEdgeWeight(edge.id);
    if (edgeWeight === 0) return ZERO_THICKNESS;
    const adjustedWeight = edgeWeight * 2;
    const rawPercentage =
      (adjustedWeight - MIN_THICKNESS) / (MAX_THICKNESS - MIN_THICKNESS);
    const percentage = Math.min(1, Math.max(0, rawPercentage));
    return (MAX_THICKNESS - MIN_THICKNESS) * percentage + MIN_THICKNESS;
  };

  const activate = () => setTheme('edgeWidth', thickener);
  const deactivate = () => removeTheme('edgeWidth');

  onUnmounted(deactivate);

  return {
    activate,
    deactivate,
  };
};

export type EdgeThickenerControls = ReturnType<typeof useEdgeThickener>;
