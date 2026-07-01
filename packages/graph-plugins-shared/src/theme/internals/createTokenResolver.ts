import { nullThrows } from '@magic/utils/assert';
import { getValue } from '@magic/utils/maybeGetter/index';

import {
  StyleValueFromThemeValue,
  ThemeOverrides,
  ThemeValueResolverArgs,
} from './types.ts';

export type TokenResolver<Themes> = <Token extends keyof Themes>(
  token: Token,
  ...args: ThemeValueResolverArgs<Themes[Token]>
) => StyleValueFromThemeValue<Themes[Token]>;

export const createTokenResolver = <Themes>(
  themeOverrides: ThemeOverrides<Themes>,
) => {
  // internal helper: resolves a token using only overrides below `upperBound`.
  // the bound is threaded explicitly through recursive calls (via `resolveBase`)
  // rather than stored in shared closure state, so concurrent/unrelated
  // resolutions on this same resolver instance can't corrupt one another.
  const resolveUpTo = <Token extends keyof Themes>(
    token: Token,
    upperBound: number,
    args: ThemeValueResolverArgs<Themes[Token]>,
  ): StyleValueFromThemeValue<Themes[Token]> => {
    const argsList = (index: number) => {
      const fn = () => resolveUpTo(token, index, args);
      return [...args, fn];
    };

    // 1. get all the overrides we have stored for a given token, up to (but excluding) upperBound
    const overrides = nullThrows(
      themeOverrides[token],
      `Theme overrides is missing entry for "${token.toString()}": Is "${token.toString()}" a valid token?`,
    ).slice(0, upperBound);

    // 2. use the find last approach to get the override that was most recently registered
    const winningIndex = overrides.findLastIndex((overrideItem, index) => {
      const themeValue = overrideItem.value;
      const styleValue = getValue(themeValue, ...argsList(index));
      return styleValue !== undefined;
    });

    // 4. the theme value for the token
    const themeValue = nullThrows(
      overrides[winningIndex]?.value,
      `No theme value found for token "${token.toString()}": Is "${token.toString()}" a valid token?`,
    );

    // 5. combine the theme value with the token resolution args to get the final resolved style value.
    // resolveBase for this call must see only overrides below the winning one, not the outer upperBound
    // (which would re-select this same override and recurse forever).
    return getValue(themeValue as any, ...argsList(winningIndex));
  };

  const resolver: TokenResolver<Themes> = (token, ...args) =>
    resolveUpTo(token, themeOverrides[token].length, args);

  return resolver;
};
