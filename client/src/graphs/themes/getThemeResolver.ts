import type { Ref } from "vue"
import type { GraphTheme } from "@graph/themes"
import type { FullThemeMap } from "@graph/themes/types"
import { getValue } from "@graph/helpers"
import type { UnwrapMaybeGetter } from "@graph/types"

/**
 * slightly modified extract utility useful for replacing the never type with R.
 */
type ModifiedExtract<T, U, R = never> = T extends U ? T : R

/**
 * implements ModifiedExtract with a noop function as the replacement type.
 */
type FuncExtract<T, U> = ModifiedExtract<T, U, () => void>

/**
 * extracts the parameters out of a graph theme properties getter function
 */
type ThemeParams<T extends keyof GraphTheme> = Parameters<FuncExtract<GraphTheme[T], Function>>

/**
 * if the theme properties getter has no parameters
 * return an empty array, otherwise return the parameters
 */
type ResolvedThemeParams<T extends keyof GraphTheme> = ThemeParams<T> extends []
  ? [] : Exclude<ThemeParams<T>, []>;


export const getThemeResolver = (
  theme: Ref<Partial<GraphTheme>>,
  themeMap: FullThemeMap,
) => <
  T extends keyof GraphTheme,
  K extends ResolvedThemeParams<T>
>(
  prop: T,
  ...args: K
) => {
    const themeMapEntry = themeMap[prop].findLast((themeMapEntryItem: FullThemeMap[T][number]) => {
      const themeGetterOrValue = themeMapEntryItem.value
      const themeValue = getValue<typeof themeGetterOrValue, K>(
        themeGetterOrValue,
        ...args
      ) as UnwrapMaybeGetter<GraphTheme[T]>
      return themeValue ?? false
    })
    const getter = themeMapEntry?.value ?? theme.value[prop]
    if (!getter) throw new Error(`Theme property "${prop}" not found`)
    return getValue<typeof getter, K>(getter, ...args) as UnwrapMaybeGetter<GraphTheme[T]>
  }

/**
 * describes the function that gets a value from a theme inquiry
 */
export type ThemeGetter = ReturnType<typeof getThemeResolver>