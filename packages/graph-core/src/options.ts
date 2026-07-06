export type CoreOptions = {
  /**
   * whether graph is weighted, if true, all individual {@link CoreEdge.weight | edge weights} are ignored and are treated as if they were `new Fraction(1)`
   * @default true
   */
  weighted: boolean;
  /**
   * whether graph is directed, if true, all {@link CoreEdge | edges} are directed, else all {@link CoreEdge | edges} are undirected
   * @default true
   */
  directed: boolean;
};

export const DEFAULT_CORE_OPTIONS: CoreOptions = {
  weighted: true,
  directed: true,
};
