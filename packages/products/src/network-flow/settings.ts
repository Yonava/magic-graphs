import { LETTERS, graphLabelGetter } from '@magic/graph/labels';
import type { GraphSettings } from '@magic/graph/settings/index';
import type { Graph } from '@magic/graph/types';
import { Fraction } from 'mathjs';

import { SINK_LABEL, SOURCE_LABEL } from './constants.ts';

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
  userAddedDefaultEdgeWeight: () => new Fraction(5),
  userAddedEdgeRuleNoSelfLoops: true,
  userAddedEdgeRuleOneEdgePerPath: true,
  edgeInputToWeight: (input: string) => {
    // fraction throws an error if the input cannot be parsed or
    // is a divide by zero operation
    try {
      const fraction = new Fraction(input);
      const numericValue = fraction.valueOf();
      if (numericValue <= 0) return;
      return fraction;
    } catch {}
  },
};
