import type {
  AnchorPoint,
  FillColor,
  FillGradient,
  LineWidth,
  Rotation,
  TextArea,
} from '../../types/schema';

export type UTurnSchema = {
  spacing: number;
  upDistance: number;
  downDistance: number;
} & AnchorPoint &
  Rotation &
  LineWidth &
  FillColor &
  TextArea &
  FillGradient;
