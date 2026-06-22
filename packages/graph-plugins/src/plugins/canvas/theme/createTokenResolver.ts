import { nullThrows } from '@magic/utils/assert';
import { getValue } from '@magic/utils/maybeGetter/index';

import type { Ref } from 'vue';

import type { ThemePreset } from '../themes/index.ts';
import { ALL_THEME_PRESETS } from '../themes/index.ts';
import {
  ThemeOverride,
  ThemeToken,
  ToThemes,
  TokenResolverArgs,
  TokenStyleValue,
} from './types.ts';

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

export function createTokenResolver<ThemeOverrides>(
  themePreset: Ref<ThemePreset>,
  themeOverrides: ThemeOverrides,
) {
  const resolveToken = <
    Token extends ThemeToken<ToThemes<ThemeOverrides>>,
    Args extends TokenResolverArgs<Token, ToThemes<ThemeOverrides>>,
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

    const styleValue = getValue(themeValue, ...args) as TokenStyleValue<
      Token,
      ToThemes<ThemeOverrides>
    >;

    return styleValue;
  };

  return resolveToken;
}

/** the function that resolves a theme token to its final StyleValue. */
export type TokenResolver<ThemeOverrides> = ReturnType<
  typeof createTokenResolver<ThemeOverrides>
>;
