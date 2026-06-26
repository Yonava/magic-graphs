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

export const createTokenResolver =
  <Themes>(themeOverrides: ThemeOverrides<Themes>): TokenResolver<Themes> =>
  (token, ...args) => {
    // 1. get all the overrides we have stored for a given token
    const overrides = nullThrows(
      themeOverrides[token],
      `Theme overrides is missing entry for "${token.toString()}": Is "${token.toString()}" a valid token?`,
    );

    // 2. use the find last approach to get the override that was most recently registered
    const override = overrides.findLast((overrideItem) => {
      const themeValue = overrideItem.value;
      const styleValue = getValue(themeValue, ...args);
      return styleValue !== undefined;
    });

    // 4. the theme value for the token
    const themeValue = nullThrows(
      override?.value,
      `No theme value found for token "${token.toString()}": Is "${token.toString()}" a valid token?`,
    );

    // 5. combine the theme value with the token resolution args to get the final resolved style value
    return getValue(themeValue as any, ...args);
  };
