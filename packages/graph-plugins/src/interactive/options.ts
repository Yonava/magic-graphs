import { MaybeGetter } from '@core/utils/maybeGetter/index';
import Fraction from 'fraction.js';

export type InteractiveOptions = {
  /**
   * the weight assigned to an edge when added via node anchor drop
   * @default 1
   */
  addedEdgeWeight: MaybeGetter<Fraction | number>;
  /**
   * whether to allow self loops.
   * relevant on directed graphs where a node can have an edge to itself
   * @default false
   */
  addedEdgeRuleNoSelfLoops: boolean;
  /**
   * whether to allow only one edge per path between two nodes.
   * relevant on directed graphs where multiple edges can exist between two nodes
   * @default false
   */
  addedEdgeRuleOneEdgePerPath: boolean;
  /**
   * a setter for {@link CoreEdge.weight | edge weight} - takes the user inputted string and returns a fraction that will
   * be set as the edge weight or returns undefined if the edge label should not be set
   */
  edgeInputToWeight: (input: string) => Fraction | undefined;
};

export const DEFAULT_INTERACTIVE_OPTIONS: InteractiveOptions = {
  edgeInputToWeight: (input: string) => {
    // fraction throws an error if the input cannot be parsed or
    // is a divide by zero operation
    try {
      return new Fraction(input);
    } catch {}
  },
  addedEdgeWeight: 1,
  addedEdgeRuleNoSelfLoops: false,
  addedEdgeRuleOneEdgePerPath: false,
};
