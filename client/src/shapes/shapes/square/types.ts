import type { RectSchema } from "../rect/types";

export type SquareSchema = Omit<RectSchema, 'width' | 'height'> & {
  size: number;
};