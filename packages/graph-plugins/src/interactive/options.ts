import { Fraction } from 'mathjs';

export type InteractiveOptions = {
  /**
   * the default {@link CoreEdge.weight | weight} assigned to edges when created using the UI
   * @default new Fraction(1)
   */
  userAddedDefaultEdgeWeight: () => Fraction;
  /**
   * whether to allow self loops.
   * relevant on directed graphs where a node can have an edge to itself
   * @default false
   */
  userAddedEdgeRuleNoSelfLoops: boolean;
  /**
   * whether to allow only one edge per path between two nodes.
   * relevant on directed graphs where multiple edges can exist between two nodes
   * @default false
   */
  userAddedEdgeRuleOneEdgePerPath: boolean;
};

export const DEFAULT_INTERACTIVE_OPTIONS: InteractiveOptions = {
  userAddedDefaultEdgeWeight: () => new Fraction(1),
  userAddedEdgeRuleNoSelfLoops: false,
  userAddedEdgeRuleOneEdgePerPath: false,
};
