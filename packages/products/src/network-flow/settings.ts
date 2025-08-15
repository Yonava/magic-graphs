import { LETTERS, graphLabelGetter } from '@magic/graph/labels';
import type { GraphSettings } from '@magic/graph/settings';
import type { Graph } from '@magic/graph/types';

import { SINK_LABEL, SOURCE_LABEL } from './constants';

const ALPHABET_WITHOUT_SOURCE_SINK = LETTERS.filter(
  (l) => l !== SOURCE_LABEL && l !== SINK_LABEL,
);

/**
 * labeller network flow graph instances (nodes)
 */
export const flowNodeLabelGetter = (graph: Pick<Graph, 'nodes'>) => {
  return graphLabelGetter(graph.nodes, ALPHABET_WITHOUT_SOURCE_SINK);
};

/**
 * settings for the network flow useGraph instance
 */
export const FLOW_GRAPH_SETTINGS: Partial<GraphSettings> = {
  persistentStorageKey: 'network-flow',
  userAddedEdgeLabel: '5',
  userAddedEdgeRuleNoSelfLoops: true,
  userAddedEdgeRuleOneEdgePerPath: true,
  edgeInputToLabel: (input) => {
    const num = Number(input);
    const isValid = !isNaN(num) && num >= 0 && num < 100;
    return isValid ? input : undefined;
  },
};
