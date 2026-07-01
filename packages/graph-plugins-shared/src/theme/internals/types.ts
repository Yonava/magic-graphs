/*
 * Naming conventions used throughout this file:
 *
 * StyleValue  — the raw, resolved value that gets painted on the canvas (e.g. string, number, Cursor).
 *               this is what a preset defines and what the renderer ultimately consumes.
 *
 * ThemeValue  — a StyleValue wrapped for the override system. consumers provide ThemeValues:
 *               either a static StyleValue or a getter that may return void to defer
 *               ("fall through") to the next override layer, eventually reaching the preset.
 *
 * ThemeToken  — a dot-notation path into a theme shape that addresses a single StyleValue
 *               (e.g. "node.default.color"). used to identify which token an override targets.
 */
import { AnyFunction } from 'ts-essentials';

/**
 * a theme token value that supports layered resolution. a static value is used as-is;
 * a getter returning `void` signals "no opinion" and defers to the next override layer,
 * eventually falling back to the active preset.
 */
export type ThemeValue<StyleValue, ResolverArgs extends unknown[] = []> =
  | StyleValue
  | ((
      ...args: [...ResolverArgs, resolveBase: () => StyleValue]
    ) => StyleValue | void);

export type ThemeValueResolverArgs<ThemeValue> =
  Parameters<Extract<ThemeValue, AnyFunction>> extends [...infer F, infer _]
    ? F
    : never;

export type StyleValueFromThemeValue<Value> =
  Value extends ThemeValue<infer StyleValue, infer _> ? StyleValue : never;

export type LooseThemes = Record<string, ThemeValue<any, any[]>>;

/** a single consumer-defined override for one theme token, tagged with the id of the `createLayer` instance that registered it. */
export type ThemeOverride<ThemeValue> = {
  value: ThemeValue;
  layerId: string;
};

export type ThemeOverrides<Themes> = {
  [Token in keyof Themes]: ThemeOverride<Themes[Token]>[];
};
