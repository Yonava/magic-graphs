import type { GraphSettings } from '@magic/graph/settings/index';
import { Fraction } from 'mathjs';

/**
 * settings for dijkstras useGraph instance
 */
export const DIJKSTRAS_GRAPH_SETTINGS: Partial<GraphSettings> = {
  localStorageKey: 'dijkstras',
  userAddedEdgeRuleNoSelfLoops: true,
  userAddedEdgeRuleOneEdgePerPath: true,
  edgeInputToWeight: (input) => {
    // fraction throws an error if the input cannot be parsed or
    // is a divide by zero operation
    try {
      const fraction = new Fraction(input);
      // dijkstras only works on positive weight edges
      if (fraction.valueOf() <= 0) return;
      return fraction;
    } catch {}
  },
};
