import { ThemeLayer, createLayer } from './createLayer.ts';
import { TokenResolver, createTokenResolver } from './createTokenResolver.ts';

export type ThemeController<ThemeOverrides> = {
  /** @internal resolves a ThemeToken through the override stack to its final StyleValue. */
  _resolveToken: TokenResolver<ThemeOverrides>;
  /** @internal the full override stack — all ThemeOverride arrays keyed by token. */
  _overrides: ThemeOverrides;
  /** creates a scoped override layer for pushing ThemeValues into the stack. */
  createLayer: (layerId?: string) => ThemeLayer<ThemeOverrides>;
};

export const createThemeController = <ThemeOverrides>(
  themeOverrides: ThemeOverrides,
  activeThemePreset: any,
): ThemeController<ThemeOverrides> => {
  const resolver = createTokenResolver(activeThemePreset, themeOverrides);

  return {
    _resolveToken: resolver,
    _overrides: themeOverrides,
    createLayer: (layerId?: string) => createLayer(themeOverrides, layerId),
  };
};
