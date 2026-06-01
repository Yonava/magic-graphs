import { getValue } from '@magic/utils/maybeGetter/index';
import type { UnwrapMaybeGetter } from '@magic/utils/maybeGetter/index';
import { Builtin, PathValue, Paths } from 'ts-essentials';

import type { Ref } from 'vue';

import type { GraphTheme, GraphThemeName } from '../themes/index.ts';
import { THEME_LOADOUTS } from '../themes/index.ts';
import {
  type FullThemeMap,
  type ThemeMapEntry,
  type ValidGraphThemePath,
} from '../themes/types.ts';

export type ResolveThemeMap<Path extends ValidGraphThemePath> = PathValue<
  FullThemeMap,
  Path
>;

type AnyFunction = (...args: never[]) => unknown;

export type UnwrapThemeEntry<ThemeMapEntries> =
  ThemeMapEntries extends ThemeMapEntry<Builtin>[]
    ? Extract<ThemeMapEntries[number]['value'], AnyFunction> extends never
      ? []
      : Parameters<Extract<ThemeMapEntries[number]['value'], AnyFunction>>
    : [];

// TODO remove as part of https://github.com/Yonava/magic-graphs/issues/584
export const getDataFromNestedPath = <Obj, Path extends Paths<Obj>>(
  obj: Obj,
  path: Path,
): PathValue<Obj, Path> | undefined =>
  path
    .split('.')
    .reduce((acc: Record<string, any>, curr: string) => acc?.[curr], obj);

export function getThemeResolver(
  themeName: Ref<GraphThemeName>,
  themeMap: FullThemeMap,
) {
  const getTheme = <
    ThemeMapPath extends ValidGraphThemePath,
    ThemeArgs extends UnwrapThemeEntry<ResolveThemeMap<ThemeMapPath>>,
  >(
    themeMapPath: ThemeMapPath,
    ...themeArgs: ThemeArgs
  ) => {
    const themeMapEntries = getDataFromNestedPath(themeMap, themeMapPath);

    if (!themeMapEntries) {
      throw new Error(`No theme map for ${themeMapPath}`);
    }

    const themeMapEntry = themeMapEntries.findLast((themeMapEntryItem) => {
      const getterOrValue = themeMapEntryItem.value;
      const themeValue = getValue<typeof getterOrValue, ThemeArgs>(
        getterOrValue,
        ...themeArgs,
      );

      return themeValue !== undefined;
    });

    const fallbackThemeMap = THEME_LOADOUTS[themeName.value];
    const defaultValue = getDataFromNestedPath(fallbackThemeMap, themeMapPath);

    const getterOrValue = themeMapEntry?.value ?? defaultValue;

    if (!getterOrValue) {
      throw new Error(`Theme property "${themeMapPath}" not found`);
    }

    const value = getValue<typeof getterOrValue, ThemeArgs>(
      getterOrValue,
      ...themeArgs,
    ) as Exclude<UnwrapMaybeGetter<PathValue<GraphTheme, ThemeMapPath>>, void>;

    return value;
  };

  return getTheme;
}

/**
 * the function that gets a value from a theme inquiry
 */
export type ThemeGetter = ReturnType<typeof getThemeResolver>;
