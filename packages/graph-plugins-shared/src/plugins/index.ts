import { LooseGraphPlugin } from './internals/loose.ts';

export { WithLifecycle } from './internals/lifecycle.ts';
export { GraphPlugin } from './internals/types.ts';

/** get the options in a plugins parameters  */
export type PluginOptions<Plugin extends LooseGraphPlugin> =
  Parameters<Plugin>[0];
