import { getValue } from '@magic/utils/maybeGetter';
import type { UnwrapMaybeGetter } from '@magic/utils/maybeGetter';
import { Builtin, PathValue, Paths } from 'ts-essentials';

import type { Ref } from 'vue';

import type { GraphTheme, GraphThemeName } from '../themes';
import { THEMES } from '../themes';
import type {
  FullThemeMap,
  ThemeMapEntry,
  ValidGraphThemePath,
} from '../themes/types';

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
      const themeGetterOrValue = themeMapEntryItem.value;
      const themeValue = getValue<typeof themeGetterOrValue, ThemeArgs>(
        themeGetterOrValue,
        ...themeArgs,
      );

      return themeValue !== undefined;
    });

    const fallbackThemeMap = THEMES[themeName.value];
    const defaultValue = getDataFromNestedPath(fallbackThemeMap, themeMapPath);

    const getterOrValue = themeMapEntry?.value ?? defaultValue;

    if (!getterOrValue) {
      throw new Error(`Theme property "${themeMapPath}" not found`);
    }

    const value = getValue<typeof getterOrValue, ThemeArgs>(
      getterOrValue,
      ...themeArgs,
    ) as Exclude<UnwrapMaybeGetter<PathValue<GraphTheme, ThemeMapPath>>, void>;

    if (!value) {
      throw new Error('Value unresolved');
    }

    return value;
  };

  return getTheme;
}

/**
 * the function that gets a value from a theme inquiry
 */
export type ThemeGetter = ReturnType<typeof getThemeResolver>;
