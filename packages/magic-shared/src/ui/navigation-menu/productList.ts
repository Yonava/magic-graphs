import { MagicProductNavigation } from '../../product/manifest.ts';

export const productList = {
  'avl-trees': {
    name: 'Magic AVL Trees',
    shortName: 'AVL',
    description: 'Learn about how an AVL tree works!',
    slug: 'trees',
    thumbnail: {
      light: '/products/thumbnails/binary-tree.png',
      dark: '/products/thumbnails/binary-tree.png',
    },
  },
  traversals: {
    name: 'Magic Traversals',
    shortName: 'TRV',
    description: 'Learn about how traversals like BFS and DFS work!',
    slug: 'traversals',
    thumbnail: {
      light: '/products/sim-thumbnails/bfs.png',
      dark: '/products/sim-thumbnails/bfs.png',
    },
  },
  'path-finding': {
    name: 'Magic Path Finding',
    shortName: 'PTH',
    description: 'Learn about how path finding algorithms like Dijkstras work!',
    slug: 'path',
    thumbnail: {
      light: '/products/thumbnails/dijkstras.png',
      dark: '/products/thumbnails/dijkstras.png',
    },
  },
  'min-spanning-trees': {
    name: 'Magic Minimum Spanning Trees',
    shortName: 'MST',
    description: 'Learn about how MST algorithms like Kruskals work!',
    slug: 'mst',
    thumbnail: {
      light: '/products/thumbnails/mst.png',
      dark: '/products/thumbnails/mst.png',
    },
  },
  dev: {
    hidden: true,
    name: 'Dev Playground',
    shortName: 'DEV',
    description: 'Dev test zone',
    slug: 'dev',
    thumbnail: {
      light: '/products/thumbnails/graph-sandbox.png',
      dark: '/products/thumbnails/graph-sandbox.png',
    },
  },
  welcome: {
    hidden: true,
    name: 'Go To Experiences',
    shortName: 'HI',
    description: 'Landing page for Magic Graphs',
    slug: 'welcome',
    thumbnail: {
      light: '/products/thumbnails/graph-sandbox.png',
      dark: '/products/thumbnails/graph-sandbox.png',
    },
  },
} as const satisfies Record<string, MagicProductNavigation>;

export type MagicProduct = MagicProductNavigation & { id: string };

export const products: MagicProduct[] = Object.entries(productList).map(
  ([productId, navigation]) => ({
    id: productId,
    ...(navigation as MagicProductNavigation),
  }),
);
