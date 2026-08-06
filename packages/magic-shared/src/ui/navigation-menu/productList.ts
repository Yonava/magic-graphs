import { MagicProductNavigation } from '../../product/manifest.ts';

export const productList = {
  'avl-trees': {
    name: 'Magic AVL Trees',
    description: 'Learn about how an AVL tree works!',
    slug: 'trees',
    thumbnail: {
      light: '/products/thumbnails/binary-tree.png',
      dark: '/products/thumbnails/binary-tree.png',
    },
  },
  traversals: {
    name: 'Magic Traversals',
    description: 'Learn about how an traversals like BFS and DFS works!',
    slug: 'traversals',
    thumbnail: {
      light: '/products/sim-thumbnails/bfs.png',
      dark: '/products/sim-thumbnails/bfs.png',
    },
  },
  'path-finding': {
    name: 'Magic Path Finding',
    description:
      'Learn about how an path finding algorithms like Dijkstras work!',
    slug: 'path',
    thumbnail: {
      light: '/products/thumbnails/dijkstras.png',
      dark: '/products/thumbnails/dijkstras.png',
    },
  },
  'min-spanning-trees': {
    name: 'Magic Minimum Spanning Trees',
    description: 'Learn about how MST algorithms like Kruskals work!',
    slug: 'mst',
    thumbnail: {
      light: '/products/thumbnails/mst.png',
      dark: '/products/thumbnails/mst.png',
    },
  },
  dev: {
    name: 'Dev Playground',
    description: 'Dev test zone',
    slug: 'dev',
    thumbnail: {
      light: '/products/thumbnails/graph-sandbox.png',
      dark: '/products/thumbnails/graph-sandbox.png',
    },
  },
} as const satisfies Record<string, MagicProductNavigation>;

export const products = Object.entries(productList).map(
  ([productId, navigation]) => ({
    id: productId,
    ...(navigation as MagicProductNavigation),
  }),
);
