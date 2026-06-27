import { Fraction } from 'mathjs';

export type CoreGraphSettings = {
  /**
   * whether graph is weighted, if true, all individual {@link CoreEdge.weight | edge weights} are ignored and are treated as if they were `new Fraction(1)`
   * @default true
   */
  isGraphWeighted: boolean;
  /**
   * whether graph is directed, if true, all {@link CoreEdge | edges} are directed, else all {@link CoreEdge | edges} are undirected
   * @default true
   */
  isGraphDirected: boolean;
  /**
   * whether {@link CoreEdge.label | edge labels} should be editable
   * @default true
   */
  edgeLabelsEditable: boolean;
  /**
   * a setter for {@link CoreEdge.weight | edge weight} - takes the user inputted string and returns a fraction that will
   * be set as the edge weight or returns undefined if the edge label should not be set
   */
  edgeInputToWeight: (input: string) => Fraction | undefined;
};

export const DEFAULT_BASE_SETTINGS: CoreGraphSettings = {
  isGraphWeighted: true,
  edgeLabelsEditable: true,
  edgeInputToWeight: (input: string) => {
    // fraction throws an error if the input cannot be parsed or
    // is a divide by zero operation
    try {
      return new Fraction(input);
    } catch {}
  },
  isGraphDirected: true,
};

/**
 * INTERACTIVE GRAPH SETTINGS
 */
export type InteractiveGraphSettings = {
  /**
   * whether the user can create, edit and delete nodes and edges.
   * when disabled, also disables graph settings: `nodeAnchors` and `edgeLabelsEditable`
   * @default true
   */
  interactive: boolean;
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

export const DEFAULT_INTERACTIVE_SETTINGS: InteractiveGraphSettings = {
  interactive: true,
  userAddedDefaultEdgeWeight: () => new Fraction(1),
  userAddedEdgeRuleNoSelfLoops: false,
  userAddedEdgeRuleOneEdgePerPath: false,
};

/**
 * represents all settings on a graph instance
 */
export type GraphSettings = CoreGraphSettings &
  InteractiveGraphSettings;

/**
 * the default settings for a graph instance
 */
export const DEFAULT_GRAPH_SETTINGS = {
  ...DEFAULT_BASE_SETTINGS,
  ...DEFAULT_INTERACTIVE_SETTINGS,
} as const satisfies GraphSettings;
