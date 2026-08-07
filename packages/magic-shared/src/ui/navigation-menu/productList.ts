import { MagicProductNavigation } from '../../product/manifest.ts';

export const productList = {
  'avl-trees': {
    name: 'Magic AVL Trees',
    slug: 'trees',
    card: {
      name: 'Magic AVL Trees',
      description: 'Learn about how an AVL tree works!',
      thumbnail: {
        light: '/products/thumbnails/binary-tree.png',
        dark: '/products/thumbnails/binary-tree.png',
      },
    },
  },
  traversals: {
    name: 'Magic Traversals',
    slug: 'traversals',
    card: {
      name: 'Magic Traversals',
      description: 'Learn about how traversals like BFS and DFS work!',
      thumbnail: {
        light: '/products/sim-thumbnails/bfs.png',
        dark: '/products/sim-thumbnails/bfs.png',
      },
    },
  },
  'path-finding': {
    name: 'Magic Path Finding',
    slug: 'path',
    card: {
      name: 'Magic Path Finding',
      description:
        'Learn about how path finding algorithms like Dijkstras work!',
      thumbnail: {
        light: '/products/thumbnails/dijkstras.png',
        dark: '/products/thumbnails/dijkstras.png',
      },
    },
  },
  'min-spanning-trees': {
    name: 'Magic Minimum Spanning Trees',
    slug: 'mst',
    card: {
      name: 'Magic Minimum Spanning Trees',
      description: 'Learn about how MST algorithms like Kruskals work!',
      thumbnail: {
        light: '/products/thumbnails/mst.png',
        dark: '/products/thumbnails/mst.png',
      },
    },
  },
  dev: {
    hidden: true,
    name: 'Dev Playground',
    slug: 'dev',
    card: {
      name: 'Dev Playground',
      description: 'Dev test zone',
      thumbnail: {
        light: '/products/thumbnails/graph-sandbox.png',
        dark: '/products/thumbnails/graph-sandbox.png',
      },
    },
  },
  welcome: {
    hidden: true,
    name: 'Go To Experiences',
    slug: 'welcome',
    card: {
      name: 'Go To Experiences',
      description: 'Landing page for Magic Graphs',
      thumbnail: {
        light: '/products/thumbnails/graph-sandbox.png',
        dark: '/products/thumbnails/graph-sandbox.png',
      },
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
