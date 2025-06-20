import type { AnchorPoint, Rotation, TextArea } from "@shape/types/schema";
import type { LoadImageOptions } from "./cache";

export type ImageSchema = {
  src: string;
  width: number;
  height: number;
} & Partial<LoadImageOptions> &
  AnchorPoint &
  Rotation &
  TextArea;