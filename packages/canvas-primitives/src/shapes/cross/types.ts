import type {
  AnchorPoint,
  BorderRadius,
  FillColor,
  LineWidth,
  Rotation,
  TextArea,
} from '../../types/schema.ts';

export type CrossSchema = {
  size: number;
} & TextArea &
  AnchorPoint &
  Rotation &
  LineWidth &
  BorderRadius &
  FillColor;
