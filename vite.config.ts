import path from 'node:path';

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vitest/config';

const r = (...p: string[]) => path.resolve(__dirname, ...p);

export default defineConfig({
  plugins: [vue()],
  test: {
    silent: true,
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '@magic/utils': r('packages/utils/src'),
      '@magic/ui': r('packages/ui/src'),
      '@magic/shapes': r('packages/shapes/src'),
      '@magic/canvas': r('packages/canvas/src'),
      '@magic/products': r('packages/products/src'),
      '@magic/create-graph': r('packages/create-graph/src'),
      '@magic/graph-algorithms': r('packages/graph-algorithms/src'),
      '@magic/graph-core': r('packages/graph-core/src'),
      '@magic/graph-plugins': r('packages/graph-plugins/src'),
      '@magic/graph-plugins-shared': r('packages/graph-plugins-shared/src'),
      '@magic/graph-primitives': r('packages/graph-primitives/src'),
      '@magic/graph-theme-presets': r('packages/graph-theme-presets/src'),
      '@magic/graph-vue': r('packages/graph-vue/src'),
    },
  },
});
