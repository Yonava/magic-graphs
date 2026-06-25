import { UnionToIntersection } from 'ts-essentials';

import { createComputedTokenResolver } from './computed-tokens/createComputedTokenResolver.ts';
import {
  ComputedTokenDetectorMap,
  computedTokenStatePrecedence,
} from './computed-tokens/types.ts';
import { LooseGraphPlugin } from './plugins/types.ts';
import { ThemeController } from './theme/createThemeController.ts';

export type Coordinate = {
  x: number;
  y: number;
};

export type WithTheme<Controls, Themes> = Controls & {
  theme: ThemeController<Themes> & {
    /**
     * maps computed token states to node/edge detector functions for this plugin.
     * detectors close over plugin state and return a style value when their state is active,
     * or `undefined` to defer to the next state in {@link computedTokenStatePrecedence}.
     * registered plugins are merged by `createGraph` into a single {@link ComputedTokenDetectorMap}
     * and passed to {@link createComputedTokenResolver}.
     */
    detectors?: ComputedTokenDetectorMap;
  };
};

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

export type ThemesForPlugins<Plugins extends LooseGraphPlugin[]> =
  UnionToIntersection<ThemeForPlugin<Plugins[number]>>;
