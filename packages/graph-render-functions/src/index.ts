/** Builds the shape for a single node. Pair with {@link CreateNodeRenderFunction} to swap in your own. */
export { createNodeRenderFunction } from './node.ts';

/** Builds the shape for a single edge, including self directed and parallel edges. Pair with {@link CreateEdgeRenderFunction} to swap in your own. */
export { createEdgeRenderFunction } from './edge.ts';

/** The contract a node render function factory satisfies. */
export type { CreateNodeRenderFunction } from './types.ts';

/** The contract an edge render function factory satisfies. */
export type { CreateEdgeRenderFunction } from './types.ts';

/** Everything a node render function is handed. */
export type { NodeRenderProps } from './types.ts';

/** Everything an edge render function is handed, including the topology facts it cannot derive on its own. */
export type { EdgeRenderProps } from './types.ts';

export type { NodeRenderFunction } from './types.ts';
export type { EdgeRenderFunction } from './types.ts';

export type { RenderFunctionOptions } from './types.ts';

/** Builds a resolver for every node style token in one pass, keyed to match what shapes accept. */
export { createNodeStyleResolver } from './resolvers.ts';

/** Builds a resolver for every edge style token in one pass, keyed to match what shapes accept. */
export { createEdgeStyleResolver } from './resolvers.ts';
