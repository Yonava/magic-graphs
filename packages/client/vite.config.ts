import path from 'node:path';

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vitest/config';

import { detectDuplicatePackages } from './vite-plugin-detect-duplicates';

const r = (...p: string[]) => path.resolve(__dirname, ...p);

export default defineConfig({
  plugins: [vue(), detectDuplicatePackages()],

  test: {
    silent: true,
    environment: 'jsdom',
  },

  build: {
    outDir: r('../server/dist/public'),
    emptyOutDir: true,
  },

  publicDir: r('../../public'),

  server: {
    fs: {
      // monorepo root
      allow: [r('../..')],
    },
  },

  optimizeDeps: {
    exclude: [
      '@magic/graph-core',
      '@magic/graph-primitives',
      '@magic/graph-plugins-shared',
      '@magic/graph-plugins',
      '@magic/graph-theme-presets',
      '@magic/utils',
      '@magic/ui',
      '@magic/shapes',
      '@magic/canvas',
      '@magic/products',
    ],
  },

  resolve: {
    alias: {
      '@magic/graph-core': r('../graph-core/src'),
      '@magic/graph-primitives': r('../graph-primitives/src'),
      '@magic/graph-plugins-shared': r('../graph-plugins-shared/src'),
      '@magic/graph-plugins': r('../graph-plugins/src'),
      '@magic/graph-theme-presets': r('../graph-theme-presets/src'),
      '@magic/utils': r('../utils/src'),
      '@magic/ui': r('../ui/src'),
      '@magic/shapes': r('../shapes/src'),
      '@magic/canvas': r('../canvas/src'),
      '@magic/products': r('../products/src'),
    },
  },
});
