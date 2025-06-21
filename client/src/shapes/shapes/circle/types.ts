import type { EllipseSchema } from "../ellipse/types"

export type CircleSchema = Omit<EllipseSchema, 'radiusX' | 'radiusY'> & {
  radius: number
}