import { Prettify, UnionToIntersection } from 'ts-essentials';

export type Coordinate = {
  x: number;
  y: number;
};

export type WithTheme<T, Themes> = T & {
  theme: ThemeController<ToThemeOverrides<Themes>>;
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

export type ThemesForPlugins<Plugins extends LooseGraphPlugin[]> = Prettify<
  UnionToIntersection<ThemeForPlugin<Plugins[number]>>
>;
