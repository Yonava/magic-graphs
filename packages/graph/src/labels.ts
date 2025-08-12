import type { Ref } from 'vue';

import type { Graph } from './types';

export const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
export const NUMBERS = Array.from({ length: 999 }, (_, i) =>
  (i + 1).toString(),
);

export type LabelledItem = { label: string };

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
export const graphLabelGetter =
  (labelledItems: Ref<LabelledItem[]>, sequence: string[]) => () => {
    let labels = labelledItems.value.map(({ label }) => label);

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

/**
 * takes a graph and gives a function that will return the next available letter label (A-Z)
 * for a node in the graph
 *
 * @param graph - a graph instance
 * @returns a function that will return the next available letter label
 */
export const nodeLetterLabelGetter = (graph: Pick<Graph, 'nodes'>) => {
  return graphLabelGetter(graph.nodes, LETTERS);
};

/**
 * takes a graph and gives a function that will return the next available number label (1-99)
 * for a node in the graph
 *
 * @param graph - a graph instance
 * @returns a function that will return the next available number label
 */
export const nodeNumberLabelGetter = (graph: Pick<Graph, 'nodes'>) => {
  return graphLabelGetter(graph.nodes, NUMBERS);
};

export const edgeLetterLabelGetter = (graph: Pick<Graph, 'edges'>) => {
  return graphLabelGetter(graph.edges, LETTERS);
};

export const edgeNumberLabelGetter = (graph: Pick<Graph, 'edges'>) => {
  return graphLabelGetter(graph.edges, NUMBERS);
};
