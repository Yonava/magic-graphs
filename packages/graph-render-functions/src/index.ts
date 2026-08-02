/** Builds the shape for a single node. Pair with {@link CreateNodeRenderer} to swap in your own. */
export { createNodeRenderer } from './node.ts';

/** Builds the shape for a single edge, including self directed and parallel edges. Pair with {@link CreateEdgeRenderer} to swap in your own. */
export { createEdgeRenderer } from './edge.ts';

/** The contract a node render function factory satisfies. */
export type { CreateNodeRenderer } from './types.ts';

/** The contract an edge render function factory satisfies. */
export type { CreateEdgeRenderer } from './types.ts';

/** Everything a node render function is handed. */
export type { NodeRenderProps } from './types.ts';

/** Everything an edge render function is handed, including the topology facts it cannot derive on its own. */
export type { EdgeRenderProps } from './types.ts';

/** Builds a resolver for every node style token in one pass, keyed to match what shapes accept. */
export { createNodeStyleResolver } from './helpers.ts';

/** Builds a resolver for every edge style token in one pass, keyed to match what shapes accept. */
export { createEdgeStyleResolver } from './helpers.ts';
