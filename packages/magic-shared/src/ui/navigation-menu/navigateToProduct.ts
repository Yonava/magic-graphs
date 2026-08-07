import { navigateTo } from 'nuxt/app';

import { MagicProductNavigation } from '../../product/manifest.ts';

/** the one place that knows how a product's slug becomes a url */
export const navigateToProduct = (product: MagicProductNavigation) =>
  navigateTo(`/${product.slug}`);
