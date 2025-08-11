import type { GraphTheme, GraphThemeName } from '@graph/themes';
import { THEMES } from '@graph/themes';
import type { FullThemeMap } from '@graph/themes/types';
import { getValue } from '@utils/maybeGetter';
import type { UnwrapMaybeGetter } from '@utils/maybeGetter';

import type { Ref } from 'vue';

/**
 * slightly modified extract utility useful for replacing the never type with R.
 */
type ModifiedExtract<T, U, R = never> = T extends U ? T : R;

/**
 * implements ModifiedExtract with a noop function as the replacement type.
 */
type FuncExtract<T, U> = ModifiedExtract<T, U, () => void>;

/**
 * extracts the parameters out of a graph theme properties getter function
 */
type ThemeParams<T extends keyof GraphTheme> = Parameters<
  FuncExtract<GraphTheme[T], Function>
>;

/**
 * if the theme properties getter has no parameters
 * return an empty array, otherwise return the parameters
 */
type ResolvedThemeParams<T extends keyof GraphTheme> =
  ThemeParams<T> extends [] ? [] : Exclude<ThemeParams<T>, []>;

export const getThemeResolver =
  (themeName: Ref<GraphThemeName>, themeMap: FullThemeMap) =>
  <T extends keyof GraphTheme, K extends ResolvedThemeParams<T>>(
    prop: T,
    ...args: K
  ) => {
    const themeMapEntry = themeMap[prop].findLast(
      (themeMapEntryItem: FullThemeMap[T][number]) => {
        const themeGetterOrValue = themeMapEntryItem.value;
        const themeValue = getValue<typeof themeGetterOrValue, K>(
          themeGetterOrValue,
          ...args,
        ) as UnwrapMaybeGetter<GraphTheme[T]>;
        return themeValue !== undefined;
      },
    );
    const getter = themeMapEntry?.value ?? THEMES[themeName.value][prop];
    if (!getter) throw new Error(`Theme property "${prop}" not found`);
    return getValue<typeof getter, K>(getter, ...args) as UnwrapMaybeGetter<
      GraphTheme[T]
    >;
  };

/**
 * the function that gets a value from a theme inquiry
 */
export type ThemeGetter = ReturnType<typeof getThemeResolver>;
