import { matrix, multiply, type Matrix } from "mathjs"

export type CanvasTransform = {
  /** corresponds to `a` in {@link CanvasRenderingContext2D.setTransform} */
  scaleX: number
  /** corresponds to `b` in {@link CanvasRenderingContext2D.setTransform} */
  skewY: number
  /** corresponds to `c` in {@link CanvasRenderingContext2D.setTransform} */
  skewX: number
  /** corresponds to `d` in {@link CanvasRenderingContext2D.setTransform} */
  scaleY: number
  /** corresponds to `e` in {@link CanvasRenderingContext2D.setTransform} */
  translateX: number
  /** corresponds to `f` in {@link CanvasRenderingContext2D.setTransform} */
  translateY: number
}

type ToMatrix = (t: CanvasTransform) => Matrix

export const toMatrix: ToMatrix = (t) => matrix([
  [t.scaleX, t.skewX, t.translateX],
  [t.skewY, t.scaleY, t.translateY],
  [0, 0, 1],
])

type FromMatrix = (m: Matrix) => CanvasTransform

export const fromMatrix: FromMatrix = (m) => {
  const [[a, c, e], [b, d, f]] = m.toArray() as number[][]
  return {
    scaleX: a,
    skewY: b,
    skewX: c,
    scaleY: d,
    translateX: e,
    translateY: f,
  }
}

type CombineTransforms = (t: CanvasTransform[]) => CanvasTransform

export const combineTransforms: CombineTransforms = (t) => fromMatrix(t
  .map(toMatrix)
  .reduce(multiply))