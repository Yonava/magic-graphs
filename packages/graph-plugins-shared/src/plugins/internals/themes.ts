import { ThemeController } from '@core/themes/index';
import { ComputedTokenDetectorMap } from '@graph/computed-tokens/index';
import { UnionToIntersection } from 'ts-essentials';

import { LooseGraphPlugin } from './loose.ts';

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
      name: infer Name extends string;
      controls: { theme: ThemeController<infer Themes> };
    }
    ? Record<Name, Themes>
    : never
  : never;

export type PluginThemes<Plugins extends LooseGraphPlugin[]> =
  UnionToIntersection<ThemeForPlugin<Plugins[number]>>;
