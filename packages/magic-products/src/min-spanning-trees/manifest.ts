import { MagicProductManifest } from '@magic/shared/product';
import { productList } from '@magic/shared/ui/index';

import MainView from './MainView.vue';

const id = 'min-spanning-trees';

export const manifest: MagicProductManifest = {
  id,
  navigation: productList[id],
  meta: {
    title: 'Minimum Spanning Trees',
    description: 'this is the minimum spanning trees product',
  },
  component: MainView,
};
