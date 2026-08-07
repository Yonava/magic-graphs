import { ThemePreset } from '../graph/types.ts';

export type Thumbnail = Record<ThemePreset, string>;

export type MagicProductNavigation = {
  slug: string;
  /**
   * hide this from navigation view?
   * @default false
   */
  hidden?: boolean;
  card: {
    name: string;
    description: string;
    thumbnail: Thumbnail;
  };
};

type MagicProductMeta = {
  title: string;
  description: string;
};

export type MagicProductManifest = {
  /** unique ID of the product experience */
  id: string;
  name: string;
  navigation: MagicProductNavigation;
  meta: MagicProductMeta;
};
