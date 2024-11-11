import type { ProductInfo } from 'src/types'

const info: ProductInfo = {
  route: {
    path: '/dijkstras',
    component: () => import('./Main.vue'),
  },
  name: 'Dijkstras Algorithm',
  description: 'Visualize Dijkstras Algorithm',
  productId: 'dijkstras',
  menu: {
    name: 'Dijkstras Algorithm',
    description: 'Visualize Dijkstras Algorithm',
    thumbnail: '/products/thumbnails/dijkstras.png',
  },
}

export default info