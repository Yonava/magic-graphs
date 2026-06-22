/*
 * Naming conventions used throughout this file:
 *
 * StyleValue  — the raw, resolved value that gets painted on the canvas (e.g. string, number, Cursor).
 *               this is what a preset defines and what the renderer ultimately consumes.
 *
 * ThemeValue  — a StyleValue wrapped for the override system via FallthroughThemeValue.
 *               consumers provide ThemeValues: either a static StyleValue or a getter that
 *               may return void to defer ("fall through") to the next override layer or preset.
 *
 * ThemeToken  — a dot-notation path into GraphTheme that addresses a single StyleValue leaf
 *               (e.g. "node.default.color"). used to identify which token an override targets.
 */
import { AnyFunction, Builtin, PathValue, Paths } from 'ts-essentials';

import { CanvasThemeOverrides } from '../themes.ts';

type LeafPaths<Schema, Path> = Path extends Path
  ? PathValue<Schema, Path> extends Builtin
    ? Path
    : never
  : never;

export type ToThemes<ThemeOverrides> = {
  [K in keyof ThemeOverrides]: ThemeOverrides[K] extends ThemeOverride<
    infer ThemeValue
  >[]
    ? ThemeValue
    : ToThemes<ThemeOverrides[K]>;
};

export type ThemeToken<Themes> = LeafPaths<Themes, Paths<Themes>>;

/**
 * a theme token value that supports layered resolution. a static value is used as-is;
 * a getter returning `void` signals "no opinion" and defers to the next override layer,
 * eventually falling back to the active preset.
 */
export type ToThemeValue<StyleValue extends AnyFunction> =
  | ReturnType<StyleValue>
  | ((...args: Parameters<StyleValue>) => ReturnType<StyleValue> | void);

/** a single consumer-defined override for one theme token, tagged with the id of the `createLayer` instance that registered it. */
export type ThemeOverride<ThemeValue> = {
  value: ThemeValue;
  layerId: string;
};

/** recursively transforms a theme shape so every leaf value becomes a `ThemeOverride` array. */
export type ToThemeOverrides<Theme> = [Theme] extends [Builtin]
  ? ThemeOverride<Theme>[]
  : Theme extends Array<infer ThemeValue>
    ? // handles nested arrays gracefully
      Array<ToThemeOverrides<ThemeValue>>
    : Theme extends Function
      ? // leaves methods alone if theme has helpers
        Theme
      : Theme extends object
        ? { [K in keyof Theme]: ToThemeOverrides<Theme[K]> }
        : Theme;
