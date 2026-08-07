import { MagicProductManifest } from '@magic/shared/product';
import { productList } from '@magic/shared/ui/index';

import MainView from './MainView.vue';

const id = 'welcome';

export const manifest: MagicProductManifest = {
  id,
  navigation: productList[id],
  meta: {
    title: 'Magic Graphs',
    description:
      'Use Magic Graphs to learn computer science theory interactively!',
  },
  component: MainView,
};
