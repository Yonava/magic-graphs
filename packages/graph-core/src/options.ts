import Fraction from 'fraction.js';

export type CoreOptions = {
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
   * a setter for {@link CoreEdge.weight | edge weight} - takes the user inputted string and returns a fraction that will
   * be set as the edge weight or returns undefined if the edge label should not be set
   */
  edgeInputToWeight: (input: string) => Fraction | undefined;
};

export const DEFAULT_CORE_OPTIONS: CoreOptions = {
  edgeInputToWeight: (input: string) => {
    // fraction throws an error if the input cannot be parsed or
    // is a divide by zero operation
    try {
      return new Fraction(input);
    } catch {}
  },
  isGraphWeighted: true,
  isGraphDirected: true,
};
