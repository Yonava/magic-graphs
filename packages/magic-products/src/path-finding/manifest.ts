import { MagicProductManifest } from '@magic/shared/product';
import { productList } from '@magic/shared/ui/index';

import MainView from './MainView.vue';

const id = 'path-finding';

export const manifest: MagicProductManifest = {
  id,
  navigation: productList[id],
  meta: {
    title: 'Path Finding',
    description: 'Path finding description',
  },
  component: MainView,
};
