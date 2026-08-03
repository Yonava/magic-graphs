// see [5] in graph-plugins-shared/plugins/internals/plugin.ts. the same late binding
// trick as createFinalTokenResolverProxy, and for the same reason: the render functions
// close over the finished token resolver, which does not exist until every plugin has
// contributed its detectors. this gives a plugin a stable stand in to capture during
import { GetterRenderFunctions } from './canvas-elements.ts';

// fold and call from a canvas transformer afterwards.
export const createFinalRenderFunctionsProxy = () => {
  let resolved: GetterRenderFunctions | undefined;

  const requireResolved = (renderFunction: keyof GetterRenderFunctions) => {
    if (!resolved) {
      throw new Error(
        `finalRenderFunctions.${renderFunction} was called before graph creation finished`,
      );
    }
    return resolved;
  };

  const finalRenderFunctions: GetterRenderFunctions = {
    node: () => requireResolved('node').node(),
    edge: () => requireResolved('edge').edge(),
  };

  return {
    finalRenderFunctions,
    resolveFinalRenderFunctions: (renderFunctions: GetterRenderFunctions) => {
      resolved = renderFunctions;
    },
  };
};
