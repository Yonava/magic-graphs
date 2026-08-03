import { generateId } from '@core/utils/id';

import { ThemeOverrides } from './types.ts';

export type ThemeLayer<Themes> = {
  /**
   * set a ThemeValue for a specific token in your graph.
   *
   * @param token - the ThemeToken you want to override
   * @param value - the ThemeValue to set
   */
  set: <Token extends keyof Themes>(token: Token, value: Themes[Token]) => void;
  /**
   * removes the override for a specific token registered by this layer.
   *
   * @param token - the ThemeToken to remove the override for
   */
  remove: (token: keyof Themes) => void;
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
export const createLayer = <Themes>(
  themeOverrides: ThemeOverrides<Themes>,
  layerId = generateId(),
): ThemeLayer<Themes> => {
  const activeTokens = new Set<keyof Themes>();

  const set: ThemeLayer<Themes>['set'] = (token, value) => {
    if (activeTokens.has(token)) {
      console.warn(
        `Attempted to set token "${token.toString()}" multiple times on the same theme layer`,
      );
      return;
    }

    const overrides = themeOverrides[token];
    if (!overrides) {
      console.warn(
        `Attempted to set token "${token.toString()}" but it was not recognized`,
      );
      return;
    }

    overrides.push({
      value,
      layerId,
    });

    activeTokens.add(token);
  };

  const remove: ThemeLayer<Themes>['remove'] = (token) => {
    const overrides = themeOverrides[token];
    if (!overrides) {
      console.warn(
        `Attempted to remove token "${token.toString()}" but it was not recognized`,
      );
      return;
    }

    const index = overrides.findIndex((entry) => entry.layerId === layerId);

    if (index === -1) {
      console.warn(
        `Attempted to remove token "${token.toString()}" but no override was found for layerId "${layerId}"`,
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
