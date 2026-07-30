import { LooseGraphTransit } from '@graph/primitives/transit/types';

// see [3] in graph-plugins-shared/plugins/internals/plugin.ts. the same trick
// createFinalActionsProxy plays for actions: the graph wide transit surface is
// assembled out of `pluginTransitControls` only once folding has finished, so a
// plugin that wants to encode or decode the whole graph needs a stable stand in
// it can capture during fold and call any time afterwards.
export const createFinalTransitProxy = () => {
  let resolved: LooseGraphTransit | undefined;

  const requireResolved = (method: keyof LooseGraphTransit) => {
    if (!resolved) {
      throw new Error(
        `finalTransit.${method} was called before graph creation finished`,
      );
    }
    return resolved;
  };

  const finalTransit: LooseGraphTransit = {
    encode: () => requireResolved('encode').encode(),
    decode: (data) => requireResolved('decode').decode(data),
  };

  return {
    finalTransit,
    resolveFinalTransit: (transit: LooseGraphTransit) => {
      resolved = transit;
    },
  };
};
