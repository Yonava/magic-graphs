import type {
  AnchorPoint,
  FillColor,
  Stroke,
  TextArea,
} from '../../types/schema';

export type EllipseSchema = {
  radiusX: number;
  radiusY: number;
} & AnchorPoint &
  FillColor &
  Stroke &
  TextArea;
