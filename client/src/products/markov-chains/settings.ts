import type { GraphSettings } from '@graph/settings';
import { Fraction } from 'mathjs';

/**
 * settings for graph sandbox useGraph instance
 */
export const MARKOV_CHAIN_GRAPH_SETTINGS: Partial<GraphSettings> = {
  persistentStorageKey: 'markov-chains',
  edgeInputToLabel: (input: string) => {
    // fraction throws an error if the input cannot be parsed or
    // is a divide by zero operation
    try {
      // TODO make the amount to simply configurable by the user
      const fracStr = new Fraction(input).simplify(0.001).toFraction();
      if (fracStr === '0') return; // 0 edges make no sense in a markov chain
      return fracStr;
    } catch {}
  },
};
