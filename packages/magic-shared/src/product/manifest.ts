import { Component } from 'vue';

import { ThemePreset } from '../graph/types.ts';

export type Thumbnail = Record<ThemePreset, string>;

export type MagicProductNavigation = {
  name: string;
  /** a 2-4 character code for tight spaces, like the face of a graph node */
  shortName: string;
  description: string;
  thumbnail: Thumbnail;
  slug: string;
  /**
   * hide this from navigation view?
   * @default false
   */
  hidden?: boolean;
};

type MagicProductMeta = {
  title: string;
  description: string;
};

export type MagicProductManifest = {
  /** unique ID of the product experience */
  id: string;
  navigation: MagicProductNavigation;
  meta: MagicProductMeta;
  component: Component;
};
