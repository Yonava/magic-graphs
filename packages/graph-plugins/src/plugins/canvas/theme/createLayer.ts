import { generateId } from '@magic/utils/id';
import { PathValue } from 'ts-essentials';

import { getDataFromNestedPath } from './createTokenResolver.ts';
import { ThemeOverride, ThemeToken, ToThemes } from './types.ts';

export type ThemeLayer<ThemeOverrides> = {
  /**
   * set a ThemeValue for a specific token in your graph.
   *
   * @param token - the ThemeToken you want to override
   * @param value - the ThemeValue (static StyleValue or fallthrough getter) to set
   */
  set: <Token extends ThemeToken<ToThemes<ThemeOverrides>>>(
    token: Token,
    value: PathValue<ThemeOverrides, Token> extends ThemeOverride<
      infer ThemeValue
    >[]
      ? ThemeValue
      : never,
  ) => void;
  /**
   * removes the override for a specific token registered by this layer.
   *
   * @param token - the ThemeToken to remove the override for
   */
  remove: (token: ThemeToken<ToThemes<ThemeOverrides>>) => void;
  /**
   * removes all overrides registered by this layer.
   */
  removeAll: () => void;
};

/**
 * creates a scoped override layer that can push ThemeValues into the override stack
 * and remove them independently. returning void from a getter defers to the next layer.
 *
 * @param themeOverrides - the ThemeOverrides instance to push overrides into
 * @param layerId - identifier for this layer, useful for debugging
 * @returns controls to set and remove token overrides
 */
export const createLayer = <ThemeOverrides>(
  themeOverrides: ThemeOverrides,
  layerId = generateId(),
): ThemeLayer<ThemeOverrides> => {
  const activeTokens = new Set<ThemeToken<ToThemes<ThemeOverrides>>>();

  const set: ThemeLayer<ThemeOverrides>['set'] = (token, value) => {
    if (activeTokens.has(token)) {
      console.warn(
        `Attempted to set token "${token}" multiple times on the same theme layer`,
      );
      return;
    }

    const overrides = getDataFromNestedPath(themeOverrides, token);
    if (!overrides) {
      console.warn(
        `Attempted to set token "${token}" but it was not recognized`,
      );
      return;
    }

    overrides.push({
      value,
      layerId,
    });

    activeTokens.add(token);
  };

  const remove: ThemeLayer<ThemeOverrides>['remove'] = (token) => {
    const overrides = getDataFromNestedPath(themeOverrides, token);
    if (!overrides) {
      console.warn(
        `Attempted to remove token "${token}" but it was not recognized`,
      );
      return;
    }

    const index = overrides.findIndex((entry) => entry.layerId === layerId);

    if (index === -1) {
      console.warn(
        `Attempted to remove token "${token}" but no override was found for layerId "${layerId}"`,
      );
      return;
    }

    overrides.splice(index, 1);
    activeTokens.delete(token);
  };

  const removeAll = () => {
    for (const token of activeTokens) remove(token);
  };

  return {
    set,
    remove,
    removeAll,
  };
};
