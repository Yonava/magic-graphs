import { UnionToIntersection } from 'ts-essentials';

import { ThemeController } from '../../theme/internals/createThemeController.ts';
import { LooseGraphPlugin } from './loose.ts';
import { ComputedTokenDetectorMap } from '../../computed-tokens/index.ts';

type Detectors = {
  /**
   * maps computed token states to node/edge detector functions for this plugin.
   * detectors close over plugin state and return a style value when their state is active,
   * or `undefined` to defer to the next state in {@link computedTokenStatePrecedence}.
   * registered plugins are merged by `createGraph` into a single {@link ComputedTokenDetectorMap}
   * and passed to {@link createComputedTokenResolver}.
   */
  detectors?: ComputedTokenDetectorMap;
};

export type PluginThemeField<Themes> = {
  theme: ThemeController<Themes> & Detectors;
};

export type WithTheme<Controls, Themes> = Controls & PluginThemeField<Themes>;

type ThemeForPlugin<Plugin extends LooseGraphPlugin> = Plugin extends Plugin
  ? ReturnType<Plugin> extends {
      controls: Record<
        infer PluginName extends string,
        { theme: ThemeController<infer Themes> }
      >;
    }
    ? Record<PluginName, Themes>
    : never
  : never;

export type PluginThemes<Plugins extends LooseGraphPlugin[]> =
  UnionToIntersection<ThemeForPlugin<Plugins[number]>>;
