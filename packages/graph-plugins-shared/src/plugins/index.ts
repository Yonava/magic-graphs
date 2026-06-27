import { LooseGraphPlugin } from './internals/loose.ts';

export { LooseGraphPlugin };
export { WithLifecycle } from './internals/lifecycle.ts';
export { GraphPlugin } from './internals/types.ts';
export { ThemesForPlugins, WithTheme } from './internals/themes.ts';
export {
  ExtractActions,
  ExtractControls,
  ExtractEventMap,
  ExtractGetters,
} from './internals/extractors.ts';

/** get the options in a plugins parameters  */
export type PluginOptions<Plugin extends LooseGraphPlugin> =
  Parameters<Plugin>[0];
