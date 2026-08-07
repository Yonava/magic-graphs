import { navigateTo } from 'nuxt/app';

import { MagicProductManifest } from '../../product/manifests/types.ts';

/** the one place that knows how a product's slug becomes a url */
export const navigateToProduct = (product: MagicProductManifest) =>
  navigateTo(`/${product.navigation.slug}`);
