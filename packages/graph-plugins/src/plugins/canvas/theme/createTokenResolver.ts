import { nullThrows } from '@magic/utils/assert';
import { getValue } from '@magic/utils/maybeGetter/index';
import type { UnwrapMaybeGetter } from '@magic/utils/maybeGetter/index';
import { AnyFunction, Builtin, PathValue, Paths } from 'ts-essentials';

import type { Ref } from 'vue';

import type { GraphTheme, ThemePreset } from '../themes/index.ts';
import { ALL_THEME_PRESETS } from '../themes/index.ts';
import { ThemeOverride, ThemeToken, ToThemes } from './types.ts';

/** the override array stored at a given ThemeToken path in ThemeOverrides. */
export type TokenOverrides<ThemeOverrides, Token> = PathValue<
  ThemeOverrides,
  Token
>;

/** extracts the getter arguments for a token's ThemeValue, or [] if the token takes a static StyleValue. */
export type ThemeArgs<ThemeOverrides> =
  ThemeOverrides extends ThemeOverride<Builtin>[]
    ? Extract<ThemeOverrides[number]['value'], AnyFunction> extends never
      ? []
      : Parameters<Extract<ThemeOverrides[number]['value'], AnyFunction>>
    : [];

// TODO remove as part of https://github.com/Yonava/magic-graphs/issues/584
export const getDataFromNestedPath = <Obj, Path>(
  obj: Obj,
  path: Path,
): ThemeOverride<unknown>[] | undefined => {
  return (
    path
      // @ts-expect-error will be replaced soon in 584
      .split('.')
      .reduce((acc: Record<string, unknown>, curr: string) => acc?.[curr], obj)
  );
};

export function createTokenResolver<ThemeOverrides extends object>(
  themePreset: Ref<ThemePreset>,
  themeOverrides: ThemeOverrides,
) {
  const resolveToken = <
    Token extends ThemeToken<ToThemes<ThemeOverrides>>,
    Args extends ThemeArgs<TokenOverrides<ThemeOverrides, Token>>,
  >(
    token: Token,
    ...args: Args
  ) => {
    const overrides = nullThrows(
      getDataFromNestedPath(themeOverrides, token),
      `No theme overrides found for token "${token}"`,
    );

    const override = overrides.findLast((overrideItem) => {
      const themeValue = overrideItem.value;
      const styleValue = getValue(themeValue, ...args);
      return styleValue !== undefined;
    });

    const preset = ALL_THEME_PRESETS[themePreset.value];
    const presetStyleValue = getDataFromNestedPath(preset, token);

    const themeValue = nullThrows(
      override?.value ?? presetStyleValue,
      `Theme token "${token}" not found`,
    );

    const styleValue = getValue(themeValue, ...args) as Exclude<
      UnwrapMaybeGetter<PathValue<ToThemes<ThemeOverrides>, Token>>,
      void
    >;

    return styleValue;
  };

  return resolveToken;
}

/** the function that resolves a theme token to its final StyleValue. */
export type TokenResolver<ThemeOverrides extends object> = ReturnType<
  typeof createTokenResolver<ThemeOverrides>
>;
