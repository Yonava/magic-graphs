import { TokenResolver, createTokenResolver } from './createTokenResolver.ts';

type TokenStuffControls<ThemeOverrides> = {
  /** @internal resolves a ThemeToken through the override stack to its final StyleValue. */
  _resolveToken: TokenResolver<ThemeOverrides>;
  /** @internal the full override stack — all ThemeOverride arrays keyed by token. */
  _overrides: ThemeOverrides;
  /** creates a scoped override layer for pushing ThemeValues into the stack. */
  createLayer: (layerId?: string) => any;
};

export const createTokenStuff = <ThemeOverrides>(
  canvasThemeOverrides: ThemeOverrides,
  activeThemePreset: any,
): TokenStuffControls<ThemeOverrides> => {
  const resolver = createTokenResolver(activeThemePreset, canvasThemeOverrides);

  return {
    _resolveToken: resolver,
    _overrides: canvasThemeOverrides,
    createLayer: () => {},
  };
};
