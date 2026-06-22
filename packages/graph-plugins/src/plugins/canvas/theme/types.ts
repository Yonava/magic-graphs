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
import { AnyFunction, Builtin, PathValue, Paths } from 'ts-essentials';

// ─── StyleValue ──────────────────────────────────────────────────────────────

/** brands `T` so the type system can distinguish it from plain objects during theme resolution. */
export type AsStyleValue<StyleValue> = StyleValue & {
  __explicitStyleValue: symbol;
};

type IsStyleValue<T> = '__explicitStyleValue' extends keyof T ? true : false;

type ExtractStyleValue<T> =
  T extends AsStyleValue<infer StyleValue> ? StyleValue : T;

// ─── ThemeValue ──────────────────────────────────────────────────────────────

/**
 * a theme token value that supports layered resolution. a static value is used as-is;
 * a getter returning `void` signals "no opinion" and defers to the next override layer,
 * eventually falling back to the active preset.
 */
export type ThemeValue<StyleValue, ResolverArgs extends unknown[] = []> =
  | StyleValue
  | ((...args: ResolverArgs) => StyleValue | void);

// ─── ThemeOverride ───────────────────────────────────────────────────────────

/** a single consumer-defined override for one theme token, tagged with the id of the `createLayer` instance that registered it. */
export type ThemeOverride<ThemeValue> = {
  value: ThemeValue;
  layerId: string;
};

// ─── ThemeToken ──────────────────────────────────────────────────────────────

type BuiltinPaths<Schema, Path> = Path extends Path
  ? PathValue<Schema, Path> extends Builtin
    ? Path
    : never
  : never;

type ExplicitStyleValuePaths<Schema, Path> = Path extends Path
  ? IsStyleValue<Exclude<PathValue<Schema, Path>, AnyFunction>> extends true
    ? Path
    : never
  : never;

type ExcludePrefix<
  Prefix extends string,
  Strings,
> = Strings extends `${Prefix}${infer _}` ? never : Strings;

/** all valid dot-notation paths into `Themes` that address a ThemeValue leaf. */
export type ThemeToken<Themes> =
  | ExplicitStyleValuePaths<Themes, Paths<Themes>>
  | ExcludePrefix<
      ExplicitStyleValuePaths<Themes, Paths<Themes>>,
      BuiltinPaths<Themes, Paths<Themes>>
    >;

/** the static StyleValue at the given token path (the non-function branch of the ThemeValue union). */
export type TokenStyleValue<Token, Themes> = ExtractStyleValue<
  Exclude<PathValue<Themes, Token>, AnyFunction>
>;

/** the arguments required to resolve the getter at the given token path. */
export type TokenResolverArgs<Token, Themes> = Parameters<
  Extract<PathValue<Themes, Token>, AnyFunction>
>;

// ─── ToThemeOverrides / ToThemes ─────────────────────────────────────────────

/**
 * recursively transforms a theme shape so every ThemeValue becomes a `ThemeOverride` array.
 * the outermost check is non-distributing so that ThemeValue unions (StyleValue | getter) are
 * recognized as leaves rather than recursed into.
 */
export type ToThemeOverrides<Theme> = [Extract<Theme, AnyFunction>] extends [
  never,
]
  ? [Theme] extends [Builtin]
    ? ThemeOverride<Theme>[]
    : Theme extends Array<infer Item>
      ? Array<ToThemeOverrides<Item>>
      : IsStyleValue<Theme> extends true
        ? ThemeOverride<Theme>[]
        : Theme extends object
          ? { [K in keyof Theme]: ToThemeOverrides<Theme[K]> }
          : Theme
  : ThemeOverride<Theme>[];

/** inverse of `ToThemeOverrides` — recovers the ThemeValue shape from a `ThemeOverride` array shape. */
export type ToThemes<ThemeOverrides> = {
  [K in keyof ThemeOverrides]: ThemeOverrides[K] extends ThemeOverride<
    infer ThemeValue
  >[]
    ? ThemeValue
    : ToThemes<ThemeOverrides[K]>;
};
