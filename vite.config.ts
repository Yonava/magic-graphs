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
      '@graph/create-graph': r('packages/create-graph/src'),
      '@graph/algorithms': r('packages/graph-algorithms/src'),
      '@graph/core': r('packages/graph-core/src'),
      '@graph/plugins': r('packages/graph-plugins/src'),
      '@graph/plugins-shared': r('packages/graph-plugins-shared/src'),
      '@graph/primitives': r('packages/graph-primitives/src'),
      '@graph/theme-presets': r('packages/graph-theme-presets/src'),
      '@graph/vue': r('packages/graph-vue/src'),
    },
  },
});
