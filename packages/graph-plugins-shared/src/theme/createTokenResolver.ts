import { nullThrows } from '@magic/utils/assert';
import { getValue } from '@magic/utils/maybeGetter/index';

import {
  ThemeOverride,
  ThemeToken,
  ToThemes,
  TokenResolverArgs,
  TokenStyleValue,
} from './types.ts';

// TODO remove as part of https://github.com/Yonava/magic-graphs/issues/584
export const getDataFromNestedPath = <Obj, Path>(obj: Obj, path: Path) =>
  path
    // @ts-expect-error will be replaced soon in 584
    .split('.')
    .reduce((acc: Record<string, unknown>, curr: string) => acc?.[curr], obj);

export type TokenResolver<ThemeOverrides> = <
  Token extends ThemeToken<ToThemes<ThemeOverrides>>,
  Args extends TokenResolverArgs<Token, ToThemes<ThemeOverrides>>,
>(
  token: Token,
  ...args: Args
) => TokenStyleValue<Token, ToThemes<ThemeOverrides>>;

export const createTokenResolver =
  <ThemeOverrides>(
    themeOverrides: ThemeOverrides,
  ): TokenResolver<ThemeOverrides> =>
  (token, ...args) => {
    // 1. get all the overrides we have stored for a given token
    const overrides: ThemeOverride<unknown>[] = nullThrows(
      getDataFromNestedPath(themeOverrides, token),
      `Theme overrides is missing entry for "${token}": Is "${token}" a registered token?`,
    );

    // 2. use the find last approach to get the override that was most recently registered
    const override = overrides.findLast((overrideItem) => {
      const themeValue = overrideItem.value;
      const styleValue = getValue(themeValue, ...args);
      return styleValue !== undefined;
    });

    // TODO when we add presets back, this needs to be re-threaded
    if (!override) return undefined as any;

    // 4. the theme value for the token with the preset fallback
    const themeValue = nullThrows(
      override?.value,
      `No theme value found for token "${token}" in overrides or preset: Is "${token}" a registered token?`,
    );

    // 5. combine the theme value with the token resolution args to get the final resolved style value
    return getValue(themeValue, ...args);
  };
