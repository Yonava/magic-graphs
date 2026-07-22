import { Component } from 'vue';

import { ThemePreset } from '../graph/types.ts';

export type Thumbnail = Record<ThemePreset, string>;

export type MagicProductNavigation = {
  name: string;
  description: string;
  thumbnail: Thumbnail;
  slug: string;
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
