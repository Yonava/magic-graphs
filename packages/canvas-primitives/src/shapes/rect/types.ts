import type {
  AnchorPoint,
  BorderRadius,
  FillColor,
  Rotation,
  Stroke,
  TextArea,
} from '../../types/schema.ts';

export type RectSchema = {
  width: number;
  height: number;
} & AnchorPoint &
  FillColor &
  Stroke &
  TextArea &
  BorderRadius &
  Rotation;
