import { CoreEdge, CoreNode } from '@magic/graph-primitives/types';

import {
  ComputedTokenDetectorMap,
  EdgeComputedTokens,
  NodeComputedTokens,
  computedTokenStatePrecedence,
} from './types.ts';

/**
 * creates a `resolveComputedToken` function with the detector map closed over.
 *
 * computed tokens are read-only style values — the product of graph state × primitive tokens. they are resolved by
 * walking `computedTokenStatePrecedence` in order and calling the detector registered for each
 * state. the first detector that returns a non-undefined value wins and its value is returned.
 *
 * plugins register detectors by state (e.g. `focus`, `hovered`) — each detector closes over its
 * own plugin state and returns a `StyleValue` if that state is active for the given subject,
 * or `undefined` to defer to the next state in the chain.
 *
 * @throws if no detector claims the token — at least one plugin must register a `default` detector
 * for every computed token to guarantee resolution.
 */
export function createComputedTokenResolver(
  detectors: ComputedTokenDetectorMap,
) {
  function resolveComputedToken<Token extends keyof NodeComputedTokens>(
    token: Token,
    subject: CoreNode,
  ): NodeComputedTokens[Token];

  function resolveComputedToken<Token extends keyof EdgeComputedTokens>(
    token: Token,
    subject: CoreEdge,
  ): EdgeComputedTokens[Token];

  function resolveComputedToken(token: string, subject: CoreNode | CoreEdge) {
    for (const state of computedTokenStatePrecedence) {
      // 1. get the detectors registered for this state, skip if none
      const stateDetectors = detectors?.[state];
      if (!stateDetectors) continue;

      // 2. look up the detector for this token — safety enforced by overloads above since node/edge cannot be reconciled at the implementation level
      const detector =
        (stateDetectors.node as any)?.[token] ??
        (stateDetectors?.edge as any)?.[token];
      if (!detector) continue;

      // 3. call the detector with the subject — if it returns a value, this state wins
      const value = detector(subject);

      // 4. undefined means this state defers — continue to the next state in the precedence chain
      if (value === undefined) continue;

      return value;
    }

    // 5. no state claimed the token — the preset is missing a "default" detector
    throw new Error(
      `No detector claimed computed token "${token}"! Does at least one plugin register a detector for the "default" state`,
    );
  }

  return resolveComputedToken;
}

export type CompoundTokenResolver = ReturnType<
  typeof createComputedTokenResolver
>;
