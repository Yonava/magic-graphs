import { ThemePreset } from '../../graph/types.ts';

/** one image per theme, since artwork legible on light is rarely legible on dark */
export type Thumbnail = Record<ThemePreset, string>;

/** the product as it appears on a navigation card */
type MagicProductCard = {
  name: string;
  description: string;
  thumbnail: Thumbnail;
};

/** everything the navigation menu needs to list a product and route to it */
export type MagicProductNavigation = {
  /** path this product is served from, without the leading slash */
  slug: string;
  /**
   * hide this from navigation view?
   * @default false
   */
  hidden?: boolean;
  card: MagicProductCard;
};

/** tags handed to `useSeoMeta` by the page hosting this product */
type MagicProductMeta = {
  title: string;
  description: string;
};

/**
 * all of a product experience except its view, so that navigation can describe
 * every product without importing any of them
 */
export type MagicProductManifest = {
  /** unique ID of the product experience */
  id: string;
  /** full product name, shown in the navigation menu trigger */
  name: string;
  navigation: MagicProductNavigation;
  meta: MagicProductMeta;
};
