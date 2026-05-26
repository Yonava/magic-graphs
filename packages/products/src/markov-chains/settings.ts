import type { GraphSettings } from '@magic/graph/settings';
import { Fraction } from 'mathjs';

/**
 * settings for graph sandbox useGraph instance
 */
export const MARKOV_CHAIN_GRAPH_SETTINGS: Partial<GraphSettings> = {
  persistentStorageKey: 'markov-chains',
  edgeInputToWeight: (input: string) => {
    // fraction throws an error if the input cannot be parsed or
    // is a divide by zero operation
    try {
      const fraction = new Fraction(input);
      const numericValue = fraction.valueOf();
      // markov chain edges must be between 0 and 1
      if (numericValue <= 0 || numericValue > 1) return;
      return fraction;
    } catch {}
  },
};
