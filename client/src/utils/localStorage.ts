import type { ProductInfo } from "src/types"

type LocalStorageGetter = (...args: any[]) => string
type LocalStorageRecord = Record<string, string | LocalStorageGetter>

export const localKeys = {
  nodes: (pid: ProductInfo['productId']) => `nodes-${pid}` as const,
  edges: (pid: ProductInfo['productId']) => `edges-${pid}` as const,
} as const satisfies LocalStorageRecord

/**
 * all return values of localStorage are, by default, string.
 * this type allows string to be narrowed to types such as 'true' | 'false'
 */
type TypeOverride = {}

type LocalObj = typeof localKeys

/**
 * @example
 * type T = TypeOrReturnType<number> // number
 * type TFunc = TypeOrReturnType<() => number> // number
 */
type TypeOrReturnType<T> = T extends (...args: any[]) => infer U ? U : T

type LocalKeys = TypeOrReturnType<LocalObj[keyof LocalObj]>
type LocalType<T extends LocalKeys> = T extends keyof TypeOverride ? TypeOverride[T] : string

/**
 * perform **type safe** localStorage actions
 */
export const local = {
  get: <T extends LocalKeys>(key: T) => localStorage.getItem(key),
  set: <T extends LocalKeys, K extends LocalType<T>>(key: T, value: K) => localStorage.setItem(
    key,
    value
  ),
  remove: <T extends LocalKeys>(key: T) => localStorage.removeItem(key),
  clear: localStorage.clear,
}