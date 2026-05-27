import type {
  AnchorPoint,
  FillColor,
  Rotation,
  TextArea,
} from '../../types/schema.ts';

export type StarSchema = {
  innerRadius: number;
  outerRadius: number;
  points?: number;
} & TextArea &
  AnchorPoint &
  FillColor &
  Rotation;
