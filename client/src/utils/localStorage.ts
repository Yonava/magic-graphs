import type { ProductInfo } from "src/types"
import type { MagicCanvasOptions } from "@canvas/index"

// @typescript-eslint/no-unused-vars reports unused even if referenced in jsdoc
/* eslint-disable */
import type { Graph } from "@graph/types"
import type { Camera } from "@canvas/camera"
/* eslint-enable */

type LocalStorageGetter = (...args: any[]) => string
type LocalStorageRecord = Record<string, string | LocalStorageGetter>

/**
 * a registry for all localStorage keys this application uses
 */
export const localKeys = {
  /** nodes in graph product - {@link Graph.persistent} */
  nodes: (pid: ProductInfo['productId']) => `nodes-${pid}` as const,
  /** edges in graph product - {@link Graph.persistent} */
  edges: (pid: ProductInfo['productId']) => `edges-${pid}` as const,
  /** camera `panX` state in magic canvas - {@link Camera.state} */
  cameraPanX: (key: MagicCanvasOptions['storageKey']) => `camera-pan-x-${key}` as const,
  /** camera `panY` state in magic canvas - {@link Camera.state} */
  cameraPanY: (key: MagicCanvasOptions['storageKey']) => `camera-pan-y-${key}` as const,
  /** camera `zoom` state in magic canvas - {@link Camera.state} */
  cameraZoom: (key: MagicCanvasOptions['storageKey']) => `camera-zoom-${key}` as const,
  /** graph product simulation speed */
  simulationPlaybackSpeed: 'simulation-playback-speed',
  /** graph theme set by user - {@link Graph.preferredTheme} */
  preferredTheme: 'preferred-theme'
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