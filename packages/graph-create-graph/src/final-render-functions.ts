import { RenderFunctions } from '@graph/render-functions/index';

// see [5] in graph-plugins-shared/plugins/internals/plugin.ts. the same late binding
// trick as createFinalTokenResolverProxy, and for the same reason: the render functions
// close over the finished token resolver, which does not exist until every plugin has
// contributed its detectors. this gives a plugin a stable stand in to capture during
// fold and call from a canvas transformer afterwards.
export const createFinalRenderFunctionsProxy = () => {
  let resolved: RenderFunctions | undefined;

  const requireResolved = (renderFunction: keyof RenderFunctions) => {
    if (!resolved) {
      throw new Error(
        `finalRenderFunctions.${renderFunction} was called before graph creation finished`,
      );
    }
    return resolved;
  };

  const finalRenderFunctions: RenderFunctions = {
    node: (node) => requireResolved('node').node(node),
    edge: (edge) => requireResolved('edge').edge(edge),
  };

  return {
    finalRenderFunctions,
    resolveFinalRenderFunctions: (renderFunctions: RenderFunctions) => {
      resolved = renderFunctions;
    },
  };
};
