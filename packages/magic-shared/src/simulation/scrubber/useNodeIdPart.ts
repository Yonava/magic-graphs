import { nullThrows } from '@core/utils/assert';

import { GNode, Graph } from '../../graph/types.ts';
import { createNodeIdThemer, useNodeStyles } from '../../node-theme/index.ts';
import type { ExplainerHighlight } from '../types.ts';
import { ExplainerSegment } from './explainerSegments.ts';

const useNodeExplainerHighlight = (
  graph: Graph,
  id: GNode['id'],
): ExplainerHighlight => {
  const { themer } = createNodeIdThemer(graph, 'active', [id]);
  const { styles, dispose } = useNodeStyles(graph, id);
  return {
    onUnmounted: dispose,
    activate: themer.activate,
    deactivate: themer.deactivate,
    classes: 'text-white',
    styles: () => ({
      backgroundColor: styles.value.border.color,
    }),
  };
};

export const useNodeRefExplainerSegment = (
  graph: Graph,
  id: GNode['id'],
): ExplainerSegment => {
  const nodeInGraph = graph.isNode(id);
  if (!nodeInGraph) {
    return {
      id: crypto.randomUUID(),
      text: '?',
      highlight: {
        tooltipLabel: `Node With ID ${id} Not in Graph`,
        classes: 'bg-red-500 hover:bg-red-700 text-white',
      },
    };
  }
  return {
    id: crypto.randomUUID(),
    text: () => nullThrows(graph.nodeLabel.get(id), 'label is missing'),
    highlight: useNodeExplainerHighlight(graph, id),
  };
};
