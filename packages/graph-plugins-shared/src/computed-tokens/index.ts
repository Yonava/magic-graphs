/** Resolves computed token values for nodes and edges by running detectors in precedence order. */
export {
  type CompoundTokenResolver,
  createComputedTokenResolver,
} from './internals/createComputedTokenResolver.ts';

/** The map of detector functions keyed by computed token state, used to resolve node and edge style tokens. */
export type {
  ComputedTokenDetectorMap,
  ComputedTokenState,
} from './internals/types.ts';

/** The computed style tokens available for nodes. */
export type { NodeComputedTokens } from './internals/types.ts';

/** The computed style tokens available for edges. */
export type { EdgeComputedTokens } from './internals/types.ts';

/** Ordered list of states used to resolve computed tokens — the first active state wins. */
export { computedTokenStatePrecedence } from './internals/types.ts';
