/** Controls the active theme for a plugin, exposing override layer management and token resolution. */
export { createThemeController } from './internals/createThemeController.ts';
export type { ThemeController } from './internals/createThemeController.ts';

/** Resolves a single theme token against the active override layers and preset. */
export { createTokenResolver } from './internals/createTokenResolver.ts';
export type { TokenResolver } from './internals/createTokenResolver.ts';

/** A layered override slot for a single theme token, scoped to a plugin instance. */
export { createLayer } from './internals/createLayer.ts';
export type { ThemeLayer } from './internals/createLayer.ts';

/** A theme token value — either a direct value or a getter that can defer to the next layer. */
export type {
  ThemeValue,
  ThemeOverrides,
  ThemeOverride,
} from './internals/types.ts';

/** All cursor values supported by the browser. */
export { CURSOR, CURSOR_FALLBACK, isValidCursor } from './internals/cursor.ts';
export type { Cursor, CursorFallback } from './internals/cursor.ts';
