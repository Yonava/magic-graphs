import { UnionToIntersection } from 'ts-essentials';

import { LooseGraphPlugin } from './plugins/types.ts';
import { ThemeController } from './theme/createThemeController.ts';

export type Coordinate = {
  x: number;
  y: number;
};

export type WithTheme<T, Themes> = T & {
  theme: ThemeController<Themes>;
};

type ThemeForPlugin<Plugin extends LooseGraphPlugin> = Plugin extends Plugin
  ? ReturnType<Plugin> extends {
      controls: Record<
        infer Name extends string,
        { theme: ThemeController<infer Themes> }
      >;
    }
    ? Record<Name, Themes>
    : never
  : never;

export type ThemesForPlugins<Plugins extends LooseGraphPlugin[]> =
  UnionToIntersection<ThemeForPlugin<Plugins[number]>>;
