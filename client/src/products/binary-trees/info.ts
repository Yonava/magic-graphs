import type { ProductInfo } from 'src/types'
import state from './state'

const info: ProductInfo = {
  route: {
    path: '/binary-trees',
    component: () => import('./Main.vue'),
  },
  name: 'Binary Trees',
  description: 'Visualize Binary Trees',
  productId: 'binary-trees',
  menu: {
    name: 'Binary Trees',
    description: 'Binary trees are a commonly to store and search for data',
    thumbnail: '/products/thumbnails/binary-tree.png',
    category: 'data structures',
  },
  state,
}

export default info