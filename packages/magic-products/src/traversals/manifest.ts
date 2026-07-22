import { MagicProductManifest } from '@magic/shared/product';
import { productList } from '@magic/shared/ui/index';

import MainView from './MainView.vue';

const id = 'traversals';

export const manifest: MagicProductManifest = {
  id,
  navigation: productList[id],
  meta: {
    title: 'Traversals!!',
    description: 'this is the traversals product',
  },
  component: MainView,
};
