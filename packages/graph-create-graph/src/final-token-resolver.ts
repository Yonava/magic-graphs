import { ComputedTokenResolver } from '@graph/computed-tokens/index';

// see [4] in graph-plugins-shared/plugins/internals/plugin.ts. same late binding
// trick as createFinalActionsProxy and createFinalTransitProxy: the detector map is
// still being accumulated while plugins fold, so the real resolver cannot exist until
// folding finishes. this gives a plugin a stable stand in to capture during fold.
export const createFinalTokenResolverProxy = () => {
  let resolved: ComputedTokenResolver | undefined;

  const finalTokenResolver = ((token: any, subject: any) => {
    if (!resolved) {
      throw new Error(
        'finalTokenResolver was called before graph creation finished',
      );
    }
    return resolved(token, subject);
  }) as ComputedTokenResolver;

  return {
    finalTokenResolver,
    resolveFinalTokenResolver: (tokenResolver: ComputedTokenResolver) => {
      resolved = tokenResolver;
    },
  };
};
