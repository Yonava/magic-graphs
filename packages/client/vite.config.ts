import vue from '@vitejs/plugin-vue';
import path from 'path';
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
  publicDir: path.resolve(__dirname, "../../public")
});
