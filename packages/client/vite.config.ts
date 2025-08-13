import { URL, fileURLToPath } from 'node:url';

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  test: {
    silent: true,
    environment: 'jsdom',
  },
  build: {
    outDir: '../server/dist/public',
  },
  resolve: {
    alias: {
      '@ui': fileURLToPath(new URL('./src/ui', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),

      '@magic/utils/colors': fileURLToPath(
        new URL('./src/utils/colors.ts', import.meta.url),
      ),
      '@shapes': fileURLToPath(new URL('./src/shapes/shapes', import.meta.url)),

      '@graph': fileURLToPath(new URL('./src/graphs', import.meta.url)),
      '@shape': fileURLToPath(new URL('./src/shapes', import.meta.url)),
      '@canvas': fileURLToPath(new URL('./src/canvas', import.meta.url)),
      '@product': fileURLToPath(new URL('./src/products', import.meta.url)),
      '@playground': fileURLToPath(
        new URL('./src/playground', import.meta.url),
      ),
    },
  },
});
