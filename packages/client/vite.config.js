import path from "node:path";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vitest/config";

const r = (...p) => path.resolve(__dirname, ...p);

export default defineConfig({
  plugins: [vue()],
  test: {
    silent: true,
    environment: "jsdom",
  },
  build: {
    outDir: "../server/dist/public",
  },
  publicDir: r("../../public"),
  server: {
    fs: {
      allow: [r("../..")], // monorepo root
    },
  },
  optimizeDeps: {
    exclude: [
      "@magic/graph",
      "@magic/utils",
      "@magic/ui",
      "@magic/shapes",
      "@magic/canvas",
      "@magic/products",
    ],
  },
  resolve: {
    alias: {
      "@magic/graph": r("../graph/src"),
      "@magic/utils": r("../utils/src"),
      "@magic/ui": r("../ui/src"),
      "@magic/shapes": r("../shapes/src"),
      "@magic/canvas": r("../canvas/src"),
      "@magic/products": r("../products/src"),
    },
  },
});
