// Directedness is immutable!
//
// A graph's directed/undirected status is fixed at instantiation and cannot be toggled.
// This is a permanent architectural decision, not a temporary limitation.
// Directedness isn't a display setting; it's a structural claim about the edge list itself, and
// other systems (plugin-held state, running simulations) build real assumptions on top of that claim
// persisting for the graph's lifetime.
// We could theoretically support toggling, but doing so safely would require every piece of
// state anywhere in the system — ours and every plugin author's — to explicitly know about and
// listen for directedness changes, so it could invalidate or migrate itself accordingly.
// That requirement is itself the problem: it introduces a new point of silent failure at every
// single piece of state that fails to wire up that listener correctly, and we have no way to
// enforce or even verify that third-party plugin code does so. Without it, an in-place
// toggle would silently invalidate assumptions without any signal to the code depending
// on them — the toggle call itself would appear to succeed, with the resulting bugs
// surfacing later, in unrelated systems, disconnected from their actual cause.
// If you need a graph with different directedness, construct a new instance

export type CoreOptions = {
  /**
   * whether graph is weighted, if true, all individual {@link CoreEdge.weight | edge weights} are treated as `new Fraction(1)`
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
