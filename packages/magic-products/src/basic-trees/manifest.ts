import { MagicProductManifest } from '@magic/shared/product';
import { productList } from '@magic/shared/ui/index';

import MainView from './MainView.vue';

const id = 'avl-trees';

export const manifest: MagicProductManifest = {
  id,
  navigation: productList[id],
  meta: {
    title: 'AVL Trees',
    description: 'this is the basic AVL trees product',
  },
  component: MainView,
};
