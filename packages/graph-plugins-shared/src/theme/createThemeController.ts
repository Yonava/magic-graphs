import { ThemeLayer, createLayer } from './createLayer.ts';
import { TokenResolver, createTokenResolver } from './createTokenResolver.ts';
import { ThemeOverrides } from './types.ts';

export type ThemeController<Themes> = {
  /** @internal resolves a ThemeToken through the override stack to its final StyleValue. */
  _resolveToken: TokenResolver<Themes>;
  /** @internal the full override stack — all ThemeOverride arrays keyed by token. */
  _overrides: ThemeOverrides<Themes>;
  /** creates a scoped override layer for pushing ThemeValues into the stack. */
  createLayer: (layerId?: string) => ThemeLayer<Themes>;
};

export const createThemeController = <Themes>(
  themeOverrides: ThemeOverrides<Themes>,
): ThemeController<Themes> => {
  const resolver = createTokenResolver(themeOverrides);

  return {
    _resolveToken: resolver,
    _overrides: themeOverrides,
    createLayer: (layerId?: string) => createLayer(themeOverrides, layerId),
  };
};
