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
  const resolveUpTo = <Token extends keyof Themes>(
    token: Token,
    upperBound: number,
    args: ThemeValueResolverArgs<Themes[Token]>,
  ): StyleValueFromThemeValue<Themes[Token]> => {
    // get all the overrides we have stored for a given token, up to (but excluding) upperBound
    const overrides = nullThrows(
      themeOverrides[token],
      `Theme overrides is missing entry for "${token.toString()}": Is "${token.toString()}" a valid token?`,
    ).slice(0, upperBound);

    let resolvedValue: StyleValueFromThemeValue<Themes[Token]> | undefined =
      undefined;

    // use the find last approach to get the override that was most recently registered
    overrides.findLast((overrideItem, index) => {
      const themeValue = overrideItem.value;
      const fullArgs = [...args, () => resolveUpTo(token, index, args)];
      const styleValue = getValue(themeValue, ...fullArgs);
      const isResolved = styleValue !== undefined;
      if (isResolved) {
        resolvedValue = styleValue as StyleValueFromThemeValue<Themes[Token]>;
      }
      return isResolved;
    });

    // if there is no resolved value it means that a token is not mapped to a style, which should never happen!
    if (resolvedValue === undefined) {
      throw new Error(
        `No theme value found for token "${token.toString()}": Is "${token.toString()}" a valid token?`,
      );
    }

    return resolvedValue;
  };

  const resolver: TokenResolver<Themes> = (token, ...args) =>
    resolveUpTo(token, themeOverrides[token].length, args);

  return resolver;
};
