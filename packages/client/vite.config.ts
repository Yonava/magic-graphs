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
      '@graph/core',
      '@graph/primitives',
      '@graph/plugins-shared',
      '@graph/plugins',
      '@graph/theme-presets',
      '@magic/utils',
      '@magic/ui',
      '@magic/shapes',
      '@magic/canvas',
      '@magic/products',
    ],
  },

  resolve: {
    alias: {
      '@graph/core': r('../graph-core/src'),
      '@graph/primitives': r('../graph-primitives/src'),
      '@graph/plugins-shared': r('../graph-plugins-shared/src'),
      '@graph/plugins': r('../graph-plugins/src'),
      '@graph/theme-presets': r('../graph-theme-presets/src'),
      '@magic/utils': r('../utils/src'),
      '@magic/ui': r('../ui/src'),
      '@magic/shapes': r('../shapes/src'),
      '@magic/canvas': r('../canvas/src'),
      '@magic/products': r('../products/src'),
    },
  },
});
