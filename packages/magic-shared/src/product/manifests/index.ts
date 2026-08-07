import { MagicProductManifest } from './types.ts';

export const manifests = {
  'avl-trees': {
    id: 'avl-trees',
    name: 'Magic AVL Trees',
    navigation: {
      slug: 'trees',
      card: {
        name: 'AVL Trees',
        description: 'Learn about how an AVL tree works!',
        thumbnail: {
          light: '/products/thumbnails/binary-tree.png',
          dark: '/products/thumbnails/binary-tree.png',
        },
      },
    },
    meta: {
      title: 'AVL Trees',
      description: 'this is the basic AVL trees product',
    },
  },
  traversals: {
    id: 'traversals',
    name: 'Magic Traversals',
    navigation: {
      slug: 'traversals',
      card: {
        name: 'Traversals',
        description: 'Learn about how traversals like BFS and DFS work!',
        thumbnail: {
          light: '/products/sim-thumbnails/bfs.png',
          dark: '/products/sim-thumbnails/bfs.png',
        },
      },
    },
    meta: {
      title: 'Traversals!!',
      description: 'this is the traversals product',
    },
  },
  'path-finding': {
    id: 'path-finding',
    name: 'Magic Path Finding',
    navigation: {
      slug: 'path',
      card: {
        name: 'Path Finding',
        description:
          'Learn about how path finding algorithms like Dijkstras work!',
        thumbnail: {
          light: '/products/thumbnails/dijkstras.png',
          dark: '/products/thumbnails/dijkstras.png',
        },
      },
    },
    meta: {
      title: 'Path Finding',
      description: 'Path finding description',
    },
  },
  'min-spanning-trees': {
    id: 'min-spanning-trees',
    name: 'Magic Minimum Spanning Trees',
    navigation: {
      slug: 'mst',
      card: {
        name: 'Minimum Spanning Trees',
        description: 'Learn about how MST algorithms like Kruskals work!',
        thumbnail: {
          light: '/products/thumbnails/mst.png',
          dark: '/products/thumbnails/mst.png',
        },
      },
    },
    meta: {
      title: 'Minimum Spanning Trees',
      description: 'this is the minimum spanning trees product',
    },
  },
  dev: {
    id: 'dev',
    name: 'Dev Playground',
    navigation: {
      slug: 'dev',
    },
    meta: {
      title: 'Path Finding',
      description: 'Path finding description',
    },
  },
  welcome: {
    id: 'welcome',
    name: 'Go To Experiences',
    navigation: {
      slug: 'welcome',
    },
    meta: {
      title: 'Magic Graphs',
      description:
        'Use Magic Graphs to learn computer science theory interactively!',
    },
  },
} as const satisfies Record<string, MagicProductManifest>;

export type ProductId = keyof typeof manifests;

/** the same manifests as a list, for rendering every product in order */
export const products: MagicProductManifest[] = Object.values(manifests);
