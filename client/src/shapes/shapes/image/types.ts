import type { LoadImageOptions } from "./cache";
import type { RectSchema } from "../rect/types";

type RectProps = Omit<RectSchema, 'borderRadius' | 'fillColor'>

type ImageSource = {
  /**
   * a path to the source of the media displayed
   */
  src: string
}

type ImageProps = ImageSource & Partial<LoadImageOptions>;

export type ImageSchema = ImageProps & RectProps;