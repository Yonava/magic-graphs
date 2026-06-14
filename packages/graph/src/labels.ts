import type { Ref } from 'vue';

import { CoreGraph } from './core/types.ts';

export const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
export const NUMBERS = Array.from({ length: 999 }, (_, i) =>
  (i + 1).toString(),
);

/**
 * takes a list of labelled items and a sequence of labels and returns a function that will
 * return the next available label in the sequence that is not already in the list of labelled items
 *
 * @param labelledItems - a list of labelled items used to check for existing labels
 * @param sequence - a sequence of labels to use when generating new labels
 * @returns a function that will return the next available label
 * @example const labelGetter = graphLabelGetter(graph.nodes, LETTERS);
 *  const newLabel = labelGetter();
 *  console.log(newLabel); // 'A'
 *  // add "A" to the list of labelled items
 *  console.log(newLabel); // 'B'
 *  // remove "A" from the list of labelled items
 *  console.log(newLabel); // 'A'
 */
export const useGraphLabelGetter =
  (labelledItems: { label: string }[], sequence: string[]) => () => {
    let labels = labelledItems.map(({ label }) => label);

    let timesAround = 0;
    let index = 0;
    let newLabel;

    const getPrefix = () => {
      if (timesAround === 0) return '';
      return sequence[(timesAround - 1) % sequence.length];
    };

    while (!newLabel) {
      const indexOutOfBounds = index >= sequence.length;
      if (indexOutOfBounds) {
        labels = labels.slice(sequence.length);
        index = 0;
        timesAround++;
      }
      const potentialLabel = getPrefix() + sequence[index];
      const labelExists = labels.includes(potentialLabel);
      if (!labelExists) newLabel = potentialLabel;
      index++;
    }

    return newLabel;
  };
