import { nullThrows } from '@magic/utils/assert';
import { getValue } from '@magic/utils/maybeGetter/index';
import type { UnwrapMaybeGetter } from '@magic/utils/maybeGetter/index';
import { AnyFunction, Builtin, PathValue, Paths } from 'ts-essentials';

import type { Ref } from 'vue';

import type { GraphTheme, ThemePreset } from '../themes/index.ts';
import { ALL_THEME_PRESETS } from '../themes/index.ts';
import {
  type ThemeOverrides,
  type ThemeOverride,
  type ThemeToken,
} from '../themes/types.ts';

/** the override array stored at a given ThemeToken path in ThemeOverrides. */
export type TokenOverrides<Token extends ThemeToken> = PathValue<
  ThemeOverrides,
  Token
>;

/** extracts the getter arguments for a token's ThemeValue, or [] if the token takes a static StyleValue. */
export type ThemeArgs<Overrides> =
  Overrides extends ThemeOverride<Builtin>[]
    ? Extract<Overrides[number]['value'], AnyFunction> extends never
      ? []
      : Parameters<Extract<Overrides[number]['value'], AnyFunction>>
    : [];

// TODO remove as part of https://github.com/Yonava/magic-graphs/issues/584
export const getDataFromNestedPath = <Obj, Path extends Paths<Obj>>(
  obj: Obj,
  path: Path,
): PathValue<Obj, Path> | undefined =>
  path
    .split('.')
    .reduce((acc: Record<string, any>, curr: string) => acc?.[curr], obj);

export function createTokenResolver(
  themePreset: Ref<ThemePreset>,
  themeOverrides: ThemeOverrides,
) {
  const resolveToken = <
    Token extends ThemeToken,
    Args extends ThemeArgs<TokenOverrides<Token>>,
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
      const styleValue = getValue<typeof themeValue, Args>(themeValue, ...args);
      return styleValue !== undefined;
    });

    const preset = ALL_THEME_PRESETS[themePreset.value];
    const presetStyleValue = getDataFromNestedPath(preset, token);

    const themeValue = nullThrows(
      override?.value ?? presetStyleValue,
      `Theme token "${token}" not found`,
    );

    const styleValue = getValue<typeof themeValue, Args>(
      themeValue,
      ...args,
    ) as Exclude<UnwrapMaybeGetter<PathValue<GraphTheme, Token>>, void>;

    return styleValue;
  };

  return resolveToken;
}

/** the function that resolves a theme token to its final StyleValue. */
export type TokenResolver = ReturnType<typeof createTokenResolver>;
