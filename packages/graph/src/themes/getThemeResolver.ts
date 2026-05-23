import { getValue } from '@magic/utils/maybeGetter';
import type { UnwrapMaybeGetter } from '@magic/utils/maybeGetter';
import { Builtin, PathValue, Paths } from 'ts-essentials';

import type { Ref } from 'vue';

import type { GraphTheme, GraphThemeName } from '../themes';
import { THEMES } from '../themes';
import type {
  FullThemeMap,
  ThemeMapEntry,
  ValidGraphThemePaths,
} from '../themes/types';

type ResolveThemeMap<Path extends ValidGraphThemePaths> = PathValue<
  FullThemeMap,
  Path
>;

type AnyFunction = (...args: never[]) => unknown;

type UnwrapThemeEntry<ThemeMapEntries> =
  ThemeMapEntries extends ThemeMapEntry<Builtin>[]
    ? Extract<ThemeMapEntries[number]['value'], AnyFunction> extends never
      ? []
      : Parameters<Extract<ThemeMapEntries[number]['value'], AnyFunction>>
    : [];

const getDataFromNestedPath = <Obj, Path extends Paths<Obj>>(
  obj: Obj,
  path: Path,
): PathValue<Obj, Path> =>
  path
    .split('.')
    .reduce((acc: Record<string, any>, curr: string) => acc[curr], obj);

export function getThemeResolver(
  themeName: Ref<GraphThemeName>,
  themeMap: FullThemeMap,
) {
  const getTheme = <
    ThemeMapPath extends ValidGraphThemePaths,
    ThemeArgs extends UnwrapThemeEntry<ResolveThemeMap<ThemeMapPath>>,
  >(
    themeMapPath: ThemeMapPath,
    ...themeArgs: ThemeArgs
  ) => {
    const themeMapEntries = getDataFromNestedPath(themeMap, themeMapPath);

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

    return getValue<typeof getterOrValue, ThemeArgs>(
      getterOrValue,
      ...themeArgs,
    ) as UnwrapMaybeGetter<PathValue<GraphTheme, ThemeMapPath>>;
  };

  return getTheme;
}

/**
 * the function that gets a value from a theme inquiry
 */
export type ThemeGetter = ReturnType<typeof getThemeResolver>;
